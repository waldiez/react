import diff from 'microdiff';
import { temporal } from 'zundo';

import { Edge, EdgeChange, Node, NodeChange, ReactFlowInstance, XYPosition } from '@xyflow/react';

import { createStore } from 'zustand';

import {
  WaldiezAgentNodeData,
  WaldiezAgentNodeType,
  WaldiezModelNodeData,
  WaldiezNodeType,
  WaldiezSkillNodeData
} from '@waldiez/models';
import { EdgesStore } from '@waldiez/store/edges';
import { FlowStore } from '@waldiez/store/flow';
import { AgentsStore, ModelsStore, NodesStore, SkillsStore } from '@waldiez/store/nodes';
import { ImportedFlow, ThingsToImport, WaldiezState, WaldiezStoreProps } from '@waldiez/types';
import { getId } from '@waldiez/utils';

/**
 * Create a Waldiez Store
 * @param initialProps - WaldiezProps to initialize the store if needed
 * @returns WaldiezState
 */
export const createWaldiezStore = (props?: WaldiezStoreProps) => {
  const {
    flowId = `wf-${getId()}`,
    edges = [],
    nodes = [],
    name = 'Untitled Flow',
    description = 'A new Waldiez flow',
    tags = [],
    requirements = [],
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString(),
    viewport = { zoom: 1, x: 50, y: 50 },
    onUpload = null,
    onChange = null
  } = props || {};
  let { storageId } = props || {};
  if (!storageId) {
    storageId = flowId;
  }
  return createStore<WaldiezState>()(
    temporal(
      (set, get) => ({
        rfInstance: props?.rfInstance,
        flowId,
        storageId,
        get,
        name: name,
        description: description,
        tags: tags,
        requirements: requirements,
        createdAt,
        updatedAt,
        viewport,
        nodes,
        edges,
        getRfInstance: () => get().rfInstance,
        setRfInstance: (rfInstance: ReactFlowInstance) => {
          const currentInstance = get().rfInstance;
          if (!currentInstance) {
            set({ rfInstance });
            ModelsStore.reArrangeModels(get, set);
            SkillsStore.reArrangeSkills(get, set);
          } else {
            set({ rfInstance });
          }
        },
        getViewport: () => get().viewport,
        onUpload,
        onChange,
        // edges
        getEdges: () => get().edges,
        onEdgesChange: (changes: EdgeChange[]) => EdgesStore.onEdgesChange(changes, get, set),
        onEdgeDoubleClick: (_event: any, edge: Edge) => EdgesStore.onEdgeDoubleClick(flowId, edge),
        addEdge: (source: string, target: string, hidden: boolean) =>
          EdgesStore.addEdge(source, target, hidden, get, set),
        getEdgeById: (edgeId: string) => EdgesStore.getEdgeById(edgeId, get),
        deleteEdge: (edgeId: string) => EdgesStore.deleteEdge(edgeId, get, set),
        updateEdgeData: (edgeId: string, data: Edge['data']) =>
          EdgesStore.updateEdgeData(edgeId, data, get, set),
        updateEdgeType: (edgeId: string, edgeType: 'chat' | 'nested' | 'group' | 'hidden') =>
          EdgesStore.updateEdgeType(edgeId, edgeType, get, set),
        updateEdgePath: (id: string, agentType: WaldiezAgentNodeType) =>
          EdgesStore.updateEdgePath(id, agentType, get, set),
        getEdgeSourceAgent: (edge: Edge) => EdgesStore.getEdgeSourceAgent(edge, get),
        // nodes
        getNodes: () => get().nodes,
        onNodesChange: (changes: NodeChange<Node>[]) => NodesStore.onNodesChange(changes, get, set),
        onNodeDoubleClick: (_event: any, node: Node) => NodesStore.onNodeDoubleClick(flowId, node, get, set),
        showNodes: (nodeType: WaldiezNodeType) => NodesStore.showNodes(nodeType, get, set),
        reselectNode: (nodeId: string) => NodesStore.reselectNode(nodeId, get, set),
        // model nodes
        getModels: () => ModelsStore.getModels(get),
        getModelById: (modelId: string) => ModelsStore.getModelById(modelId, get),
        addModel: () => ModelsStore.addModel(get, set),
        cloneModel: (modelId: string) => ModelsStore.cloneModel(modelId, get, set),
        updateModelData: (modelId: string, data: WaldiezModelNodeData) =>
          ModelsStore.updateModelData(modelId, data, get, set),
        deleteModel: (modelId: string) => ModelsStore.deleteModel(modelId, get, set),
        exportModel: (modelId: string) => ModelsStore.exportModel(modelId, get),
        importModel: (model: { [key: string]: unknown }, modelId: string, position: XYPosition | undefined) =>
          ModelsStore.importModel(model, modelId, position),
        // skill nodes
        getSkills: () => SkillsStore.getSkills(get),
        getSkillById: (skillId: string) => SkillsStore.getSkillById(skillId, get),
        addSkill: () => SkillsStore.addSkill(get, set),
        cloneSkill: (skillId: string) => SkillsStore.cloneSkill(skillId, get, set),
        updateSkillData: (skillId: string, data: WaldiezSkillNodeData) =>
          SkillsStore.updateSkillData(skillId, data, get, set),
        deleteSkill: (skillId: string) => SkillsStore.deleteSkill(skillId, get, set),
        exportSkill: (skillId: string) => SkillsStore.exportSkill(skillId, get),
        importSkill: (skill: { [key: string]: unknown }, skillId: string, position: XYPosition | undefined) =>
          SkillsStore.importSkill(skill, skillId, position),
        // agent nodes
        getAgentConnections: (
          nodeId: string,
          options = {
            sourcesOnly: false,
            targetsOnly: false,
            skipManagers: false
          }
        ) => AgentsStore.getAgentConnections(nodeId, get, options),
        getGroupMembers: (groupId: string) => AgentsStore.getGroupMembers(groupId, get),
        addGroupMember: (groupId: string, memberId: string) =>
          AgentsStore.addGroupMember(groupId, memberId, get, set),
        removeGroupMember: (groupId: string, memberId: string) =>
          AgentsStore.removeGroupMember(groupId, memberId, get, set),
        setAgentGroup: (agentId: string, groupId: string | undefined) =>
          AgentsStore.setAgentGroup(agentId, groupId, get, set),
        changeGroup: (agentId: string, newGroupId: string) =>
          AgentsStore.changeGroup(agentId, newGroupId, get, set),
        getAgents: () => AgentsStore.getAgents(get),
        addAgent: (agentType: WaldiezAgentNodeType, position: { x: number; y: number }, parentId?: string) =>
          AgentsStore.addAgent(agentType, position, get, set, parentId),
        getAgentById: (agentId: string) => AgentsStore.getAgentById(agentId, get),
        cloneAgent: (agentId: string) => AgentsStore.cloneAgent(agentId, get, set),
        updateAgentData: (agentId: string, data: Partial<WaldiezAgentNodeData>) =>
          AgentsStore.updateAgentData(agentId, data, get, set),
        deleteAgent: (agentId: string) => AgentsStore.deleteAgent(agentId, get, set),
        importAgent: (
          agent: { [key: string]: unknown },
          agentId: string,
          skipLinks: boolean,
          position: XYPosition | undefined
        ) => AgentsStore.importAgent(agent, agentId, skipLinks, position),
        exportAgent: (agentId: string, skipLinks: boolean) =>
          AgentsStore.exportAgent(agentId, skipLinks, get),
        // flow
        updateFlow: (data: { name: string; description: string; tags: string[]; requirements: string[] }) =>
          FlowStore.updateFlow(data, set),
        updateFlowOrder: (data: { id: string; order: number }[]) => FlowStore.updateFlowOrder(data, get, set),
        getFlowEdges: () => FlowStore.getFlowEdges(get),
        importFlow: (items: ThingsToImport, flowData: ImportedFlow, typeShown: WaldiezNodeType) => {
          const { rfInstance, viewport: storedViewport } = get();
          const currentViewport = rfInstance?.getViewport() ?? storedViewport;
          FlowStore.importFlow(items, flowData, typeShown, currentViewport, get, set);
        },
        exportFlow: (hideSecrets: boolean) => FlowStore.exportFlow(hideSecrets, get),
        onViewportChange: (viewport: { zoom: number; x: number; y: number }, nodeType: WaldiezNodeType) =>
          FlowStore.onViewportChange(viewport, nodeType, get, set),
        getFlowInfo: () => {
          const { flowId, storageId, name, description, tags, requirements, createdAt, updatedAt } = get();
          return {
            flowId,
            storageId: storageId ?? flowId,
            name,
            description,
            tags,
            requirements,
            createdAt,
            updatedAt
          };
        },
        onFlowChanged: () => {
          const flow = FlowStore.exportFlow(false, get);
          if (flow && onChange) {
            onChange(JSON.stringify(flow));
          }
          return flow;
        }
      }),
      {
        equality: zundoEquality,
        partialize: (state: WaldiezState) => {
          const { flowId, nodes, edges, name, description, requirements, tags } = state;
          return {
            flowId,
            nodes,
            edges,
            name,
            description,
            requirements,
            tags
          };
        }
      }
    )
  );
};

const zundoEquality = (pastState: Partial<WaldiezState>, currentState: Partial<WaldiezState>) => {
  const diffs = diff(pastState, currentState);
  // only check nodes[n].data and edges[n].data
  // if we only have 'updatedAt' changes, we can ignore them
  if (diffs.length === 0) {
    return true;
  }
  // console.log(diffs);
  const equal = diffs.every(diff => {
    if (diff.type === 'CREATE' && diff.path.length === 2) {
      // new node or edge
      return false;
    }
    if (
      diff.path.length === 1 &&
      typeof diff.path[0] === 'string' &&
      ['name', 'description', 'tags', 'requirements'].includes(diff.path[0])
    ) {
      return false;
    }
    if (diff.path.includes('nodes') && diff.path.includes('data')) {
      return false;
    }
    if (diff.path.includes('edges') && diff.path.includes('data') && !diff.path.includes('position')) {
      return false;
    }
    return true;
  });
  // if (!equal) {
  //   console.log(diffs);
  // }
  return equal;
};
