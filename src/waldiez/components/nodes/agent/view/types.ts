import { Connection } from '@xyflow/react';

import {
  WaldiezAgentNode,
  WaldiezAgentNodeData,
  WaldiezAgentNodeType,
  WaldiezEdge,
  WaldiezModelNode,
  WaldiezSkillNode
} from '@waldiez/types';

export type WaldiezNodeAgentFooterViewProps = {
  id: string;
  data: { updatedAt: string };
  onDelete: () => void;
  onClone: () => void;
};
export type WaldiezNodeAgentHeaderViewProps = {
  id: string;
  data: WaldiezAgentNodeData;
  onOpenNodeModal: () => void;
};
export type WaldiezNodeAgentViewProps = {
  id: string;
  flowId: string;
  data: WaldiezAgentNodeData;
  parentId: string | undefined;
  edge: WaldiezEdge | null;
  isNodeModalOpen: boolean;
  isEdgeModalOpen: boolean;
  isDarkMode: boolean;
  models: WaldiezModelNode[];
  skills: WaldiezSkillNode[];
  agents: WaldiezAgentNode[];
  currentGroupManager: WaldiezAgentNode | null;
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
  uploadsEnabled: boolean;
  onDataChange: (partialData: Partial<WaldiezAgentNodeData>, persist?: boolean) => void;
  setCurrentGroupManager: (manager: WaldiezAgentNode | null) => void;
  onOpenNodeModal: () => void;
  onOpenEdgeModal: (event: React.MouseEvent) => void;
  onCloseNodeModal: () => void;
  onCloseEdgeModal: () => void;
  onClone: () => void;
  onDelete: () => void;
  onEdgeConnection: (connection: Connection) => void;
  onCancel: () => void;
  onSubmit: (filesToUpload: File[]) => void;
  onAgentTypeChange: (agentType: WaldiezAgentNodeType) => void;
};
