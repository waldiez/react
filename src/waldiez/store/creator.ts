import diff from 'microdiff';
import { temporal } from 'zundo';

import { Edge, EdgeChange, Node, NodeChange, ReactFlowInstance, XYPosition } from '@xyflow/react';

import { createStore } from 'zustand';

import { nanoid } from 'nanoid';

import {
  WaldiezAgentNode,
  WaldiezAgentNodeType,
  WaldiezModelNodeData,
  WaldiezNodeType,
  WaldiezSkillNodeData
} from '@waldiez/models';
import { EdgesStore } from '@waldiez/store/edges';
import { FlowStore } from '@waldiez/store/flow';
import { AgentsStore, ModelsStore, NodesStore, SkillsStore } from '@waldiez/store/nodes';
import { WaldiezState, WaldiezStoreProps } from '@waldiez/types';

/**
 * Create a Waldiez Store
 * @param initialProps - WaldiezProps to initialize the store if needed
 * @returns WaldiezState
 */
export const createWaldiezStore = (props?: WaldiezStoreProps) => {
  const {
    flowId = `wf-${nanoid()}`,
    edges = [],
    nodes = [],
    name = 'Untitled Flow',
    description = 'A new Waldiez flow',
    tags = [],
    requirements = [],
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString(),
    viewport = { zoom: 1, x: 50, y: 50 },
    onUpload = null
  } = props || {};
  let { storageId } = props || {};
  if (!storageId) {
    storageId = flowId;
  }
  const rfInstance = props?.rfInstance;
  return createStore<WaldiezState>()(
    temporal(
      (set, get) => ({
        rfInstance,
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
        setRfInstance: (rfInstance: ReactFlowInstance) => {
          set({ rfInstance });
        },
        onUpload,
        // edges
        onEdgesChange: (changes: EdgeChange[]) => {
          EdgesStore.onEdgesChange(changes, get, set);
        },
        onEdgeDoubleClick: (_event: any, edge: Edge) => {
          EdgesStore.onEdgeDoubleClick(flowId, edge);
        },
        addEdge: (source: string, target: string, hidden: boolean) => {
          return EdgesStore.addEdge(source, target, hidden, get, set);
        },
        getEdgeById: (edgeId: string) => {
          return EdgesStore.getEdgeById(edgeId, get);
        },
        deleteEdge: (edgeId: string) => {
          EdgesStore.deleteEdge(edgeId, get, set);
        },
        updateEdgeData: (edgeId: string, data: Edge['data']) => {
          EdgesStore.updateEdgeData(edgeId, data, get, set);
        },
        updateEdgeType: (edgeId: string, edgeType: 'chat' | 'nested' | 'group' | 'hidden') => {
          EdgesStore.updateEdgeType(edgeId, edgeType, get, set);
        },
        updateEdgePath(id: string, agentType: WaldiezAgentNodeType) {
          EdgesStore.updateEdgePath(id, agentType, get, set);
        },
        getEdgeSourceAgent(edge: Edge) {
          return EdgesStore.getEdgeSourceAgent(edge, get);
        },
        // nodes
        onNodesChange: (changes: NodeChange<Node>[]) => {
          NodesStore.onNodesChange(changes, get, set);
        },
        onNodeDoubleClick: (_event: any, node: Node) => {
          NodesStore.onNodeDoubleClick(flowId, node, get, set);
        },
        showNodes: (nodeType: WaldiezNodeType) => {
          NodesStore.showNodes(nodeType, get, set);
        },
        reselectNode: (nodeId: string) => {
          NodesStore.reselectNode(nodeId, get, set);
        },
        // model nodes
        getModels: () => {
          return ModelsStore.getModels(get);
        },
        getModelById: (modelId: string) => {
          return ModelsStore.getModelById(modelId, get);
        },
        addModel: () => {
          return ModelsStore.addModel(get, set);
        },
        cloneModel: (modelId: string) => {
          return ModelsStore.cloneModel(modelId, get, set);
        },
        updateModelData: (modelId: string, data: WaldiezModelNodeData) => {
          ModelsStore.updateModelData(modelId, data, get, set);
        },
        deleteModel: (modelId: string) => {
          ModelsStore.deleteModel(modelId, get, set);
        },
        exportModel: (modelId: string) => {
          return ModelsStore.exportModel(modelId, get);
        },
        importModel: (
          model: { [key: string]: unknown },
          modelId: string,
          position: XYPosition | undefined
        ) => {
          return ModelsStore.importModel(model, modelId, position);
        },
        // skill nodes
        getSkills: () => {
          return SkillsStore.getSkills(get);
        },
        getSkillById: (skillId: string) => {
          return SkillsStore.getSkillById(skillId, get);
        },
        addSkill: () => {
          return SkillsStore.addSkill(get, set);
        },
        cloneSkill: (skillId: string) => {
          return SkillsStore.cloneSkill(skillId, get, set);
        },
        updateSkillData: (skillId: string, data: WaldiezSkillNodeData) => {
          SkillsStore.updateSkillData(skillId, data, get, set);
        },
        deleteSkill: (skillId: string) => {
          SkillsStore.deleteSkill(skillId, get, set);
        },
        exportSkill: (skillId: string) => {
          return SkillsStore.exportSkill(skillId, get);
        },
        importSkill: (
          skill: { [key: string]: unknown },
          skillId: string,
          position: XYPosition | undefined
        ) => {
          return SkillsStore.importSkill(skill, skillId, position);
        },
        // agent nodes
        getAgentConnections: (
          nodeId: string,
          options = {
            sourcesOnly: false,
            targetsOnly: false
          }
        ) => {
          return AgentsStore.getAgentConnections(nodeId, get, options);
        },
        getGroupMembers: (groupId: string) => {
          return AgentsStore.getGroupMembers(groupId, get);
        },
        addGroupMember: (groupId: string, memberId: string) => {
          AgentsStore.addGroupMember(groupId, memberId, get, set);
        },
        removeGroupMember: (groupId: string, memberId: string) => {
          AgentsStore.removeGroupMember(groupId, memberId, get, set);
        },
        setAgentGroup: (agentId: string, groupId: string | undefined) => {
          AgentsStore.setAgentGroup(agentId, groupId, get, set);
        },
        changeGroup: (agentId: string, newGroupId: string) => {
          AgentsStore.changeGroup(agentId, newGroupId, get, set);
        },
        getAgents: () => {
          return AgentsStore.getAgents(get);
        },
        addAgent: (
          agentType: WaldiezAgentNodeType,
          position: { x: number; y: number },
          parentId?: string
        ) => {
          return AgentsStore.addAgent(agentType, position, get, set, parentId);
        },
        getAgentById: (agentId: string) => {
          return AgentsStore.getAgentById(agentId, get);
        },
        cloneAgent: (agentId: string) => {
          return AgentsStore.cloneAgent(agentId, get, set);
        },
        updateAgentData: (agentId: string, data: Partial<WaldiezAgentNode['data']>) => {
          AgentsStore.updateAgentData(agentId, data, get, set);
        },
        deleteAgent: (agentId: string) => {
          AgentsStore.deleteAgent(agentId, get, set);
        },
        importAgent: (
          agent: { [key: string]: unknown },
          agentId: string,
          skipLinks: boolean,
          position: XYPosition | undefined
        ) => {
          return AgentsStore.importAgent(agent, agentId, skipLinks, position);
        },
        exportAgent: (agentId: string, skipLinks: boolean) => {
          return AgentsStore.exportAgent(agentId, skipLinks, get);
        },
        // flow
        updateFlow: (data: { name: string; description: string; tags: string[]; requirements: string[] }) => {
          FlowStore.updateFlow(data, set);
        },
        updateFlowOrder: (data: { id: string; order: number }[]) => {
          FlowStore.updateFlowOrder(data, get, set);
        },
        getFlowEdges: () => {
          return FlowStore.getFlowEdges(get);
        },
        importFlow: (flow: unknown, typeShown: WaldiezNodeType) => {
          FlowStore.importFlow(flow, createdAt, updatedAt, typeShown, get, set);
          EdgesStore.resetEdgePositions(get, set);
        },
        exportFlow: (hideSecrets: boolean) => {
          return FlowStore.exportFlow(hideSecrets, get);
        },
        onViewportChange: (viewport: { zoom: number; x: number; y: number }, nodeType: WaldiezNodeType) => {
          FlowStore.onViewportChange(viewport, nodeType, get, set);
        }
      }),
      {
        equality: (pastState: Partial<WaldiezState>, currentState: Partial<WaldiezState>) => {
          const diffs = diff(pastState, currentState);
          // Skip updates if certain properties have changed
          // e.g. we do not want to store dragging events
          const ignoredPaths = [
            ['updatedAt'],
            ['nodes', '*', 'hidden'],
            ['nodes', '*', 'measured'],
            ['nodes', '*', 'selected'],
            ['nodes', '*', 'dragging'],
            ['nodes', '*', 'position'],
            ['edges', '*', 'selected'],
            ['edges', '*', 'data', 'position'],
            ['viewport', 'x'],
            ['viewport', 'y']
          ]; // we must test this, we might have false positives

          const equal = !diffs.some(
            diff =>
              !ignoredPaths.some(path =>
                path.every(
                  (segment, index) =>
                    segment === '*' || JSON.stringify(diff.path[index]) === JSON.stringify(segment)
                )
              )
          );
          // if (!equal) {
          //   console.log('diffs', diffs);
          // }
          return equal;
        }
      }
    )
  );
};
