import { SingleValue } from '@waldiez/components/inputs';
import { WaldiezAgentNode, WaldiezAgentNodeData } from '@waldiez/models';

export type GroupAgentConfigTabProps = {
  id: string;
  data: WaldiezAgentNodeData;
  agents: WaldiezAgentNode[];
  onDataChange: (partialData: Partial<WaldiezAgentNodeData>, persist?: boolean) => void;
  currentGroupManager: WaldiezAgentNode | null;
  setCurrentGroupManager: (manager: WaldiezAgentNode | null) => void;
};
export type GroupAgentConfigTabViewProps = {
  id: string;
  currentGroup: WaldiezAgentNode | null;
  selectedGroup: WaldiezAgentNode | null;
  groupOptions: { label: string; value: WaldiezAgentNode }[];
  onSelectGroupChange: (option: SingleValue<{ label: string; value: WaldiezAgentNode }>) => void;
  onJoinGroup: () => void;
  onLeaveGroup: () => void;
};
