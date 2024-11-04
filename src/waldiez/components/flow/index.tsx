/* eslint-disable max-lines-per-function */
import {
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  ReactFlowInstance,
  Viewport,
  XYPosition,
  useReactFlow
} from '@xyflow/react';

import { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { WaldiezFlowProps } from '@waldiez/components/flow/types';
import { WaldiezFlowView } from '@waldiez/components/flow/view';
import { showSnackbar } from '@waldiez/components/snackbar';
import { WaldiezAgentNodeType, WaldiezNodeType } from '@waldiez/models';
import { useTemporalStore, useWaldiezContext } from '@waldiez/store';
import { selector } from '@waldiez/store/selector';
import { isDarkMode, setDarkMode, toggleThemeMode } from '@waldiez/theme';

export const WaldiezFlow = (props: WaldiezFlowProps) => {
  const { flowId, storageId, onRun, onChange, inputPrompt, onUserInput } = props;
  const store = useWaldiezContext(selector);
  const { undo, redo, futureStates, pastStates } = useTemporalStore(state => state);
  const { screenToFlowPosition, getIntersectingNodes } = useReactFlow();
  const darkTheme = isDarkMode(flowId, storageId);
  const [isDark, setIsDark] = useState<boolean>(darkTheme);
  const [isModalOpen, setModalOpen] = useState(false);
  const isFlowVisible = () => {
    const rootDiv = document.getElementById(`rf-root-${flowId}`);
    if (!rootDiv) {
      return false;
    }
    const clientRect = rootDiv.getBoundingClientRect();
    return clientRect.width > 0 && clientRect.height > 0;
  };
  useHotkeys(
    'mod+z',
    () => {
      if (pastStates.length > 0) {
        if (isFlowVisible()) {
          undo();
        }
      }
    },
    { scopes: flowId }
  );
  useHotkeys(
    ['shift+mod+z', 'mod+y'],
    () => {
      if (futureStates.length > 0) {
        if (isFlowVisible()) {
          redo();
        }
      }
    },
    { scopes: flowId }
  );
  useEffect(() => {
    store.showNodes('agent');
    setDarkMode(flowId, storageId, isDarkMode(flowId, storageId));
  }, []);
  const [selectedNodeType, setSelectedNodeType] = useState<WaldiezNodeType>('agent');
  const onFlowChanged = () => {
    const flow = getFlow();
    if (flow && onChange) {
      onChange(JSON.stringify(flow));
    }
    return flow;
  };
  const getFlow = (hideSecrets: boolean = false) => {
    return store.exportFlow(hideSecrets);
  };
  const canRun = () => {
    const agentsCount = store.getAgents().length;
    if (agentsCount < 2) {
      const msg = agentsCount === 0 ? 'No agents' : 'Only one agent';
      showSnackbar(flowId, `${msg} found in the flow`, 'error', 3000);
      return false;
    }
    const [orderedEdges, _] = store.getFlowEdges();
    return orderedEdges.length > 0;
  };
  const onFlowInit = (instance: ReactFlowInstance) => {
    store.setRfInstance(instance);
    const rootDiv = document.getElementById(`rf-root-${flowId}`);
    if (rootDiv) {
      const viewport = instance.getViewport();
      instance.fitView({
        minZoom: viewport.zoom,
        maxZoom: viewport.zoom,
        includeHiddenNodes: false,
        padding: 10,
        duration: 100
      });
    }
  };
  const handleRun = () => {
    if (typeof onRun === 'function') {
      if (onRun) {
        if (canRun()) {
          const flow = onFlowChanged();
          if (flow) {
            onRun(JSON.stringify(flow));
          }
        } else {
          setModalOpen(true);
        }
      }
    }
  };
  const deleteNode = (target: Element) => {
    const nodeId = target.getAttribute('data-id');
    if (nodeId) {
      const isAgent = target.classList.contains('react-flow__node-agent');
      const isModel = target.classList.contains('react-flow__node-model');
      const isSkill = target.classList.contains('react-flow__node-skill');
      if (isAgent) {
        store.deleteAgent(nodeId);
      } else {
        if (isModel) {
          store.deleteModel(nodeId);
        } else {
          if (isSkill) {
            store.deleteSkill(nodeId);
          }
        }
      }
    }
  };
  const deleteEdge = (target: Element) => {
    const edgeId = target.getAttribute('data-id');
    if (edgeId) {
      store.deleteEdge(edgeId);
    }
  };
  const onDeleteKey = (event: KeyboardEvent) => {
    const target = event.target;
    const isNode = target instanceof Element && target.classList.contains('react-flow__node');
    if (isNode) {
      deleteNode(target);
      onFlowChanged();
    } else {
      const isEdge =
        target instanceof Element &&
        (target.classList.contains('react-flow__edge') || target.classList.contains('edge-data-view'));
      if (isEdge) {
        deleteEdge(target);
        onFlowChanged();
      }
    }
  };
  const onKeyDown = (event: KeyboardEvent | undefined) => {
    if (event?.key === 'Delete') {
      onDeleteKey(event);
    }
  };
  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  const getIntersectingManager = (intersectingNodes: Node[]) => {
    let parent: Node | undefined;
    const isIntersectingWithManager = intersectingNodes.some(
      node => node.type === 'agent' && node.data.agentType === 'manager'
    );
    if (isIntersectingWithManager) {
      const managerNode = intersectingNodes.find(
        node => node.type === 'agent' && node.data.agentType === 'manager'
      );
      if (managerNode) {
        parent = managerNode;
      }
    }
    return parent;
  };
  const getDroppedAgentParent = (agentType: WaldiezAgentNodeType, position: XYPosition) => {
    let parent: Node | undefined;
    if (agentType !== 'manager') {
      const { x, y } = position;
      const nodeRect = {
        x,
        y,
        width: 100,
        height: 100
      };
      let intersectingNodes: Node[] = [];
      try {
        intersectingNodes = getIntersectingNodes(nodeRect);
      } catch (_) {
        // testing/no dom: Cannot read properties of undefined (reading 'parentId')
      }
      if (intersectingNodes.length > 0) {
        parent = getIntersectingManager(intersectingNodes);
      }
    }
    return parent;
  };
  const getAgentType = (event: React.DragEvent<HTMLDivElement>) => {
    const nodeTypeData = event.dataTransfer.getData('application/node');
    let agentType: WaldiezAgentNodeType | undefined;
    if (nodeTypeData === 'agent') {
      const agentTypeData = event.dataTransfer.getData('application/agent');
      if (['user', 'assistant', 'manager'].includes(agentTypeData)) {
        agentType = agentTypeData as WaldiezAgentNodeType;
      }
    }
    if (nodeTypeData !== 'agent' || !agentType) {
      agentType = undefined;
    }
    return agentType;
  };
  const addAgentNode = (event: React.DragEvent<HTMLDivElement>, agentType: WaldiezAgentNodeType) => {
    let position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY
    });
    const parent = getDroppedAgentParent(agentType, position);
    if (parent) {
      position = parent.position;
    }
    const newNode = store.addAgent(agentType, position);
    if (parent) {
      addParentNodeEdge(parent, newNode);
    }
    return newNode;
  };
  const addParentNodeEdge = (parent: Node, newNode: Node) => {
    store.addEdge(parent.id, newNode.id, true);
    setTimeout(() => {
      store.setAgentGroup(newNode.id, parent.id);
    }, 0);
    setTimeout(() => {
      store.reselectNode(parent.id);
    }, 100);
  };
  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const agentType = getAgentType(event);
      if (!agentType) {
        return;
      }
      addAgentNode(event, agentType);
      if (selectedNodeType !== 'agent') {
        setSelectedNodeType('agent');
        store.showNodes('agent');
      }
      onFlowChanged();
    },
    [screenToFlowPosition]
  );
  const onNodeTypeSelected = (nodeType: WaldiezNodeType) => {
    setSelectedNodeType(nodeType);
    store.showNodes(nodeType);
  };
  const onAddNode = () => {
    if (selectedNodeType === 'model') {
      store.addModel();
      onFlowChanged();
    } else if (selectedNodeType === 'skill') {
      store.addSkill();
      onFlowChanged();
    }
  };
  const onNodesChange = (changes: NodeChange<Node>[]) => {
    store.onNodesChange(changes);
    onFlowChanged();
  };
  const onEdgesChange = (changes: EdgeChange<Edge>[]) => {
    store.onEdgesChange(changes);
    onFlowChanged();
  };
  const onModalSubmit = (data: {
    name: string;
    description: string;
    tags: string[];
    requirements: string[];
    orders: { id: string; order: number }[];
  }) => {
    store.updateFlow(data);
    store.updateFlowOrder(data.orders);
    // setModalOpen(false);
    onFlowChanged();
  };
  const onNodeDoubleClick = (event: React.MouseEvent, node: Node) => {
    const target = event.target;
    if (target instanceof Element && target.tagName === 'TEXTAREA') {
      return;
    }
    store.onNodeDoubleClick(event, node);
  };
  const includeRunButton = typeof onRun === 'function';
  const onImport = (contents: any) => {
    store.importFlow(contents, selectedNodeType);
    setSelectedNodeType('agent');
    store.showNodes('agent');
    onFlowChanged();
  };
  const onThemeToggle = () => {
    setIsDark(!isDark);
    toggleThemeMode(flowId, storageId);
  };
  const onViewportChange = (viewport: Viewport) => {
    store.onViewportChange(viewport, selectedNodeType);
  };
  return (
    <WaldiezFlowView
      flowId={flowId}
      storageId={storageId}
      darkMode={isDark}
      store={store}
      selectedNodeType={selectedNodeType}
      isModalOpen={isModalOpen}
      inputPrompt={inputPrompt}
      includeRunButton={includeRunButton}
      onThemeToggle={onThemeToggle}
      onCloseModal={setModalOpen.bind(null, false)}
      getFlow={getFlow}
      onEditFlow={setModalOpen.bind(null, true)}
      onImport={onImport}
      onUserInput={onUserInput}
      onAddNode={onAddNode}
      onNodesChange={onNodesChange}
      onNodeDoubleClick={onNodeDoubleClick}
      onEdgesChange={onEdgesChange}
      onViewportChange={onViewportChange}
      onRun={handleRun}
      onModalSubmit={onModalSubmit}
      onNodeTypeSelected={onNodeTypeSelected}
      onFlowInit={onFlowInit}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onkeydown={onKeyDown}
    />
  );
};
