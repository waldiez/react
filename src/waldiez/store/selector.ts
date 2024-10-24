import { ReactFlowInstance } from '@xyflow/react';

import { WaldiezState } from '@waldiez/types';

/**
 * Store actions selector to get and set the state
 * @param store - WaldiezState
 * @returns WaldiezState
 */
export const selector = (store: WaldiezState & { rfInstance: ReactFlowInstance | null }) => ({
  flowId: store.flowId,
  nodes: store.nodes,
  edges: store.edges,
  name: store.name,
  description: store.description,
  requirements: store.requirements,
  tags: store.tags,
  viewport: store.viewport,
  rfInstance: store.rfInstance,
  get: store.get,
  setRfInstance: store.setRfInstance,
  onEdgesChange: store.onEdgesChange,
  onEdgeDoubleClick: store.onEdgeDoubleClick,
  addEdge: store.addEdge,
  deleteEdge: store.deleteEdge,
  getEdgeById: store.getEdgeById,
  updateEdgeType: store.updateEdgeType,
  updateEdgePath: store.updateEdgePath,
  updateEdgeData: store.updateEdgeData,
  getEdgeSourceAgent: store.getEdgeSourceAgent,
  // nodes
  onNodesChange: store.onNodesChange,
  onNodeDoubleClick: store.onNodeDoubleClick,
  showNodes: store.showNodes,
  reselectNode: store.reselectNode,
  // nodes - models
  getModels: store.getModels,
  getModelById: store.getModelById,
  addModel: store.addModel,
  cloneModel: store.cloneModel,
  updateModelData: store.updateModelData,
  deleteModel: store.deleteModel,
  importModel: store.importModel,
  exportModel: store.exportModel,
  // nodes - skills
  getSkills: store.getSkills,
  getSkillById: store.getSkillById,
  addSkill: store.addSkill,
  cloneSkill: store.cloneSkill,
  updateSkillData: store.updateSkillData,
  deleteSkill: store.deleteSkill,
  importSkill: store.importSkill,
  exportSkill: store.exportSkill,
  // nodes - agents
  getAgents: store.getAgents,
  addAgent: store.addAgent,
  getAgentById: store.getAgentById,
  setAgentGroup: store.setAgentGroup,
  cloneAgent: store.cloneAgent,
  updateAgentData: store.updateAgentData,
  deleteAgent: store.deleteAgent,
  getAgentConnections: store.getAgentConnections,
  getGroupMembers: store.getGroupMembers,
  addGroupMember: store.addGroupMember,
  removeGroupMember: store.removeGroupMember,
  changeGroup: store.changeGroup,
  importAgent: store.importAgent,
  exportAgent: store.exportAgent,
  // flow
  updateFlow: store.updateFlow,
  updateFlowOrder: store.updateFlowOrder,
  getFlowEdges: store.getFlowEdges,
  importFlow: store.importFlow,
  exportFlow: store.exportFlow,
  onViewportChange: store.onViewportChange,
  //
  onUpload: store.onUpload
});
