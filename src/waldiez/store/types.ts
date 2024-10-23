import {
  Edge,
  EdgeChange,
  Node,
  OnNodesChange,
  ReactFlowInstance,
  Viewport,
  XYPosition
} from '@xyflow/react';

import {
  WaldiezAgentNode,
  WaldiezAgentNodeData,
  WaldiezAgentNodeType,
  WaldiezEdge,
  WaldiezModelNode,
  WaldiezModelNodeData,
  WaldiezNodeType,
  WaldiezSkillNode,
  WaldiezSkillNodeData
} from '@waldiez/models';

export type WaldiezStoreProps = {
  viewport?: Viewport;
  flowId: string;
  name: string;
  description: string;
  requirements: string[];
  storageId?: string;
  createdAt?: string;
  updatedAt?: string;
  tags: string[];
  edges: Edge[]; // only react flow related (no data)
  nodes: Node[]; // only react flow related (no data)
  onUpload?: ((files: File[]) => Promise<string[]>) | null; // handler for file uploads (send to backend)
};

export type typeOfSet = {
  (
    partial:
      | WaldiezState
      | Partial<WaldiezState>
      | ((state: WaldiezState) => WaldiezState | Partial<WaldiezState>),
    replace?: false
  ): void;
};

export type typeOfGet = () => WaldiezState & {
  rfInstance: ReactFlowInstance | null;
};

export type WaldiezState = WaldiezStoreProps & {
  rfInstance: ReactFlowInstance | null;
  get: () => WaldiezStoreProps & {
    rfInstance: ReactFlowInstance | null;
  };
  setRfInstance: (instance: ReactFlowInstance) => void;
  // edges
  onEdgesChange: (changes: EdgeChange[]) => void;
  onEdgeDoubleClick: (event: any, edge: Edge) => void;
  addEdge: (source: string, target: string, hidden: boolean) => Edge;
  deleteEdge: (id: string) => void;
  getEdgeById: (id: string) => Edge | null;
  updateEdgeType: (id: string, edgeType: 'chat' | 'nested' | 'group' | 'hidden') => void;
  updateEdgePath: (id: string, agentType: WaldiezAgentNodeType) => void;
  updateEdgeData: (id: string, data: Edge['data']) => void;
  getEdgeSourceAgent: (edge: Edge) => WaldiezAgentNode | null;
  // nodes
  onNodesChange: OnNodesChange;
  onNodeDoubleClick: (event: any, node: Node) => void;
  showNodes(nodeType: WaldiezNodeType): void;
  reselectNode: (nodeId: string) => void;
  // models
  getModels: () => WaldiezModelNode[];
  getModelById: (id: string) => WaldiezModelNode | null;
  addModel: () => WaldiezModelNode;
  cloneModel: (id: string) => WaldiezModelNode;
  updateModelData: (id: string, data: WaldiezModelNodeData) => void;
  deleteModel(id: string): void;
  importModel: (
    model: { [key: string]: unknown },
    modelId: string,
    position: XYPosition | undefined
  ) => WaldiezModelNode;
  exportModel: (modelId: string) => { [key: string]: unknown } | null;
  // skills
  getSkills: () => WaldiezSkillNode[];
  getSkillById: (id: string) => WaldiezSkillNode | null;
  addSkill: () => WaldiezSkillNode;
  cloneSkill: (id: string) => WaldiezSkillNode;
  updateSkillData: (id: string, data: WaldiezSkillNodeData) => void;
  deleteSkill(id: string): void;
  exportSkill: (skillId: string) => { [key: string]: unknown } | null;
  importSkill: (
    skillData: { [key: string]: unknown },
    skillId: string,
    position: XYPosition | undefined
  ) => WaldiezSkillNode;
  // agents
  getAgents: () => WaldiezAgentNode[];
  addAgent: (
    agentType: WaldiezAgentNodeType,
    position: { x: number; y: number },
    parentId?: string
  ) => WaldiezAgentNode;
  getAgentById: (id: string) => WaldiezAgentNode | null;
  setAgentGroup: (agentId: string, groupId: string | undefined) => void;
  cloneAgent: (id: string) => WaldiezAgentNode;
  updateAgentData: (id: string, data: Partial<WaldiezAgentNodeData>) => void;
  deleteAgent(id: string): void;
  getAgentConnections: (
    nodeId: string,
    options?: {
      sourcesOnly?: boolean;
      targetsOnly?: boolean;
    }
  ) => {
    source: {
      nodes: WaldiezAgentNode[];
      edges: WaldiezEdge[];
    };
    target: {
      nodes: WaldiezAgentNode[];
      edges: WaldiezEdge[];
    };
  };
  getGroupMembers: (groupId: string) => WaldiezAgentNode[];
  addGroupMember: (groupId: string, memberId: string) => void;
  removeGroupMember: (groupId: string, memberId: string) => void;
  changeGroup: (agentId: string, newGroupId: string) => void;
  importAgent: (
    agent: { [key: string]: unknown },
    agentId: string,
    skipLinks: boolean,
    position: XYPosition | undefined
  ) => WaldiezAgentNode;
  exportAgent: (agentId: string, skipLinks: boolean) => { [key: string]: unknown } | null;
  // flow
  updateFlow: (data: { name: string; description: string; tags: string[]; requirements: string[] }) => void;
  updateFlowOrder: (data: { id: string; order: number }[]) => void;
  getFlowEdges: () => [WaldiezEdge[], WaldiezEdge[]];
  importFlow: (flow: { [key: string]: unknown }, typeShown: WaldiezNodeType) => void;
  exportFlow: (hideSecrets: boolean) => { [key: string]: unknown } | null;
  onViewportChange: (viewport: Viewport, nodeType: WaldiezNodeType) => void;
  //
  onUpload: ((files: File[]) => Promise<string[]>) | null;
};
