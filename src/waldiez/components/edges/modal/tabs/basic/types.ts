import { SingleValue } from '@waldiez/components/inputs';
import { WaldieEdgeData, WaldieEdgeLlmSummaryMethod, WaldieEdgeType } from '@waldiez/models';

export type WaldieEdgeBasicTabProps = {
  edgeId: string;
  edgeType: WaldieEdgeType;
  data: WaldieEdgeData;
  onTypeChange: (
    option: SingleValue<{
      label: string;
      value: WaldieEdgeType;
    }>
  ) => void;
  onDataChange: (data: Partial<WaldieEdgeData>) => void;
};

export type WaldieEdgeBasicTabViewProps = {
  edgeId: string;
  edgeType: WaldieEdgeType;
  data: WaldieEdgeData;
  onEdgeTypeChange: (
    option: SingleValue<{
      label: string;
      value: WaldieEdgeType;
    }>
  ) => void;
  onLabelChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClearHistoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxTurnsChange: (value: number | null) => void;
  onSummaryMethodChange: (
    option: SingleValue<{
      label: string;
      value: WaldieEdgeLlmSummaryMethod;
    }>
  ) => void;
  onLlmPromptChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onLlmSummaryRoleChange: (
    option: SingleValue<{
      label: string;
      value: string;
    }>
  ) => void;
};
