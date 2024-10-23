import {
  WaldiezAgentNode,
  WaldiezAgentNodeData,
  WaldiezAgentNodeType,
  WaldiezEdge,
  WaldiezModelNode,
  WaldiezSkillNode
} from '@waldiez/models';

export type WaldiezNodeAgentModalProps = {
  flowId: string;
  id: string;
  isNodeModalOpen: boolean;
  isDarkMode: boolean;
  canUploadFiles: boolean;
  currentGroupManager: WaldiezAgentNode | null;
  data: WaldiezAgentNodeData;
  models: WaldiezModelNode[];
  skills: WaldiezSkillNode[];
  agents: WaldiezAgentNode[];
  agentConnections: {
    source: {
      nodes: WaldiezAgentNode[];
      edges: WaldiezEdge[];
    };
    target: {
      nodes: WaldiezAgentNode[];
      edges: WaldiezEdge[];
    };
  };
  setCurrentGroupManager: (manager: WaldiezAgentNode | null) => void;
  onAgentTypeChange: (type: WaldiezAgentNodeType) => void;
  onDataChange: (partialData: Partial<WaldiezAgentNodeData>, persist?: boolean) => void;
  onCloseNodeModal: () => void;
  onCancel: () => void;
  onSubmit: (filesToUpload: File[]) => void;
};
