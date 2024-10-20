import { Connection } from '@xyflow/react';

import {
  WaldieAgentNode,
  WaldieAgentNodeData,
  WaldieAgentNodeType,
  WaldieEdge,
  WaldieModelNode,
  WaldieSkillNode
} from '@waldiez/types';

export type WaldieNodeAgentFooterViewProps = {
  id: string;
  data: { updatedAt: string };
  onDelete: () => void;
  onClone: () => void;
};
export type WaldieNodeAgentHeaderViewProps = {
  id: string;
  data: WaldieAgentNodeData;
  onOpenNodeModal: () => void;
};
export type WaldieNodeAgentViewProps = {
  id: string;
  flowId: string;
  data: WaldieAgentNodeData;
  parentId: string | undefined;
  edge: WaldieEdge | null;
  isNodeModalOpen: boolean;
  isEdgeModalOpen: boolean;
  isDarkMode: boolean;
  models: WaldieModelNode[];
  skills: WaldieSkillNode[];
  agents: WaldieAgentNode[];
  currentGroupManager: WaldieAgentNode | null;
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
  uploadsEnabled: boolean;
  onDataChange: (partialData: Partial<WaldieAgentNodeData>, persist?: boolean) => void;
  setCurrentGroupManager: (manager: WaldieAgentNode | null) => void;
  onOpenNodeModal: () => void;
  onOpenEdgeModal: (event: React.MouseEvent) => void;
  onCloseNodeModal: () => void;
  onCloseEdgeModal: () => void;
  onClone: () => void;
  onDelete: () => void;
  onEdgeConnection: (connection: Connection) => void;
  onCancel: () => void;
  onSubmit: (filesToUpload: File[]) => void;
  onAgentTypeChange: (agentType: WaldieAgentNodeType) => void;
};
