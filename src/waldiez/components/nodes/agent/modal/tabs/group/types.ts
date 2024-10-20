import { SingleValue } from '@waldiez/components/inputs';
import { WaldieAgentNode, WaldieAgentNodeData } from '@waldiez/models';

export type GroupAgentConfigTabProps = {
  id: string;
  data: WaldieAgentNodeData;
  agents: WaldieAgentNode[];
  onDataChange: (partialData: Partial<WaldieAgentNodeData>, persist?: boolean) => void;
  currentGroupManager: WaldieAgentNode | null;
  setCurrentGroupManager: (manager: WaldieAgentNode | null) => void;
};
export type GroupAgentConfigTabViewProps = {
  id: string;
  currentGroup: WaldieAgentNode | null;
  selectedGroup: WaldieAgentNode | null;
  groupOptions: { label: string; value: WaldieAgentNode }[];
  onSelectGroupChange: (option: SingleValue<{ label: string; value: WaldieAgentNode }>) => void;
  onJoinGroup: () => void;
  onLeaveGroup: () => void;
};
