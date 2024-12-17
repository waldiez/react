import { Node, NodeChange, applyNodeChanges } from '@xyflow/react';

import { typeOfGet, typeOfSet } from '@waldiez/store/types';
import { getFlowRoot } from '@waldiez/utils';

export { AgentsStore } from '@waldiez/store/nodes/agents';
export { ModelsStore } from '@waldiez/store/nodes/models';
export { SkillsStore } from '@waldiez/store/nodes/skills';

export class NodesStore {
  static onNodesChange: (changes: NodeChange[], get: typeOfGet, set: typeOfSet) => void = (
    changes,
    get,
    set
  ) => {
    const nodes = applyNodeChanges(changes, get().nodes);
    set({
      nodes,
      updatedAt: new Date().toISOString()
    });
  };
  static onNodeDoubleClick: (flowId: string, node: Node, get: typeOfGet, set: typeOfSet) => void = (
    flowId,
    node
  ) => {
    // first, make sure there is no `<dialog .. open>` in the flow
    const openDialogs = document.querySelectorAll('dialog[open]');
    if (openDialogs.length > 0) {
      return;
    }
    const flowRoot = getFlowRoot(flowId);
    if (flowRoot) {
      const nodeType = node.type;
      const openModalBtn = flowRoot.querySelector(
        `#open-${nodeType}-node-modal-${node.id}`
      ) as HTMLButtonElement;
      if (openModalBtn) {
        openModalBtn.click();
      }
    }
  };
  static showNodes: (nodeType: string, get: typeOfGet, set: typeOfSet) => void = (nodeType, get, set) => {
    set({
      nodes: get().nodes.map(node => {
        if (node.type === nodeType) {
          return { ...node, hidden: false };
        }
        return { ...node, hidden: true };
      })
    });
    const rfInstance = get().rfInstance;
    if (rfInstance) {
      if (nodeType !== 'agent') {
        const zoom = rfInstance.getZoom();
        rfInstance.setViewport({
          zoom,
          x: 20,
          y: 40
        });
      }
    }
  };
  static reselectNode: (nodeId: string, get: typeOfGet, set: typeOfSet) => void = (nodeId, get, set) => {
    // if selected, un-select and reselect
    // if not selected, select
    const node = get().nodes.find(n => n.id === nodeId);
    if (!node) {
      return;
    }
    if (node.selected) {
      set({
        nodes: get().nodes.map(node => {
          if (node.id === nodeId) {
            return { ...node, selected: false };
          }
          return node;
        })
      });
    }
    set({
      nodes: get().nodes.map(node => {
        if (node.id === nodeId) {
          return { ...node, selected: true };
        }
        return { ...node, selected: false };
      })
    });
  };
}
