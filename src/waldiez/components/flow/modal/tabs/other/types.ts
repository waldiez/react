import { FlowModalData } from '@waldiez/components/flow/modal/types';

export type WaldiezFlowModalOtherTabProps = {
  data: FlowModalData;
  onDataChange: (data: Partial<FlowModalData>) => void;
};
export type WaldiezFlowModalOtherTabViewProps = {
  tags: string[];
  requirements: string[];
  onAddTag: (tag: string) => void;
  onDeleteTag: (tag: string) => void;
  onTagChange: (oldValue: string, newValue: string) => void;
  onAddRequirement: (requirement: string) => void;
  onDeleteRequirement: (requirement: string) => void;
  onRequirementChange: (oldValue: string, newValue: string) => void;
};
