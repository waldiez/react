import {
  WaldieAgentNode,
  WaldieAgentNodeData,
  WaldieAgentNodeType,
  WaldieEdge,
  WaldieModelNode,
  WaldieSkillNode
} from '@waldiez/models';

export type WaldieNodeAgentModalProps = {
  flowId: string;
  id: string;
  isNodeModalOpen: boolean;
  isDarkMode: boolean;
  canUploadFiles: boolean;
  currentGroupManager: WaldieAgentNode | null;
  data: WaldieAgentNodeData;
  models: WaldieModelNode[];
  skills: WaldieSkillNode[];
  agents: WaldieAgentNode[];
  agentConnections: {
    source: {
      nodes: WaldieAgentNode[];
      edges: WaldieEdge[];
    };
    target: {
      nodes: WaldieAgentNode[];
      edges: WaldieEdge[];
    };
  };
  setCurrentGroupManager: (manager: WaldieAgentNode | null) => void;
  onAgentTypeChange: (type: WaldieAgentNodeType) => void;
  onDataChange: (partialData: Partial<WaldieAgentNodeData>, persist?: boolean) => void;
  onCloseNodeModal: () => void;
  onCancel: () => void;
  onSubmit: (filesToUpload: File[]) => void;
};
