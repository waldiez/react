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
  WaldieAgentNode,
  WaldieAgentNodeData,
  WaldieAgentNodeType,
  WaldieEdge,
  WaldieModelNode,
  WaldieModelNodeData,
  WaldieNodeType,
  WaldieSkillNode,
  WaldieSkillNodeData
} from '@waldiez/models';

export type WaldieStoreProps = {
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
      | WaldieState
      | Partial<WaldieState>
      | ((state: WaldieState) => WaldieState | Partial<WaldieState>),
    replace?: false
  ): void;
};

export type typeOfGet = () => WaldieState & {
  rfInstance: ReactFlowInstance | null;
};

export type WaldieState = WaldieStoreProps & {
  rfInstance: ReactFlowInstance | null;
  get: () => WaldieStoreProps & {
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
  updateEdgePath: (id: string, agentType: WaldieAgentNodeType) => void;
  updateEdgeData: (id: string, data: Edge['data']) => void;
  getEdgeSourceAgent: (edge: Edge) => WaldieAgentNode | null;
  // nodes
  onNodesChange: OnNodesChange;
  onNodeDoubleClick: (event: any, node: Node) => void;
  showNodes(nodeType: WaldieNodeType): void;
  reselectNode: (nodeId: string) => void;
  // models
  getModels: () => WaldieModelNode[];
  getModelById: (id: string) => WaldieModelNode | null;
  addModel: () => WaldieModelNode;
  cloneModel: (id: string) => WaldieModelNode;
  updateModelData: (id: string, data: WaldieModelNodeData) => void;
  deleteModel(id: string): void;
  importModel: (
    model: { [key: string]: unknown },
    modelId: string,
    position: XYPosition | undefined
  ) => WaldieModelNode;
  exportModel: (modelId: string) => { [key: string]: unknown } | null;
  // skills
  getSkills: () => WaldieSkillNode[];
  getSkillById: (id: string) => WaldieSkillNode | null;
  addSkill: () => WaldieSkillNode;
  cloneSkill: (id: string) => WaldieSkillNode;
  updateSkillData: (id: string, data: WaldieSkillNodeData) => void;
  deleteSkill(id: string): void;
  exportSkill: (skillId: string) => { [key: string]: unknown } | null;
  importSkill: (
    skillData: { [key: string]: unknown },
    skillId: string,
    position: XYPosition | undefined
  ) => WaldieSkillNode;
  // agents
  getAgents: () => WaldieAgentNode[];
  addAgent: (
    agentType: WaldieAgentNodeType,
    position: { x: number; y: number },
    parentId?: string
  ) => WaldieAgentNode;
  getAgentById: (id: string) => WaldieAgentNode | null;
  setAgentGroup: (agentId: string, groupId: string | undefined) => void;
  cloneAgent: (id: string) => WaldieAgentNode;
  updateAgentData: (id: string, data: Partial<WaldieAgentNodeData>) => void;
  deleteAgent(id: string): void;
  getAgentConnections: (
    nodeId: string,
    options?: {
      sourcesOnly?: boolean;
      targetsOnly?: boolean;
    }
  ) => {
    source: {
      nodes: WaldieAgentNode[];
      edges: WaldieEdge[];
    };
    target: {
      nodes: WaldieAgentNode[];
      edges: WaldieEdge[];
    };
  };
  getGroupMembers: (groupId: string) => WaldieAgentNode[];
  addGroupMember: (groupId: string, memberId: string) => void;
  removeGroupMember: (groupId: string, memberId: string) => void;
  changeGroup: (agentId: string, newGroupId: string) => void;
  importAgent: (
    agent: { [key: string]: unknown },
    agentId: string,
    skipLinks: boolean,
    position: XYPosition | undefined
  ) => WaldieAgentNode;
  exportAgent: (agentId: string, skipLinks: boolean) => { [key: string]: unknown } | null;
  // flow
  updateFlow: (data: { name: string; description: string; tags: string[]; requirements: string[] }) => void;
  updateFlowOrder: (data: { id: string; order: number }[]) => void;
  getFlowEdges: () => [WaldieEdge[], WaldieEdge[]];
  importFlow: (flow: { [key: string]: unknown }, typeShown: WaldieNodeType) => void;
  exportFlow: (hideSecrets: boolean) => { [key: string]: unknown } | null;
  onViewportChange: (viewport: Viewport, nodeType: WaldieNodeType) => void;
  //
  onUpload: ((files: File[]) => Promise<string[]>) | null;
};
