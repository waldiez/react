import { SingleValue } from '@waldiez/components/inputs';
import { WaldiezEdgeData, WaldiezEdgeLlmSummaryMethod, WaldiezEdgeType } from '@waldiez/models';

export type WaldiezEdgeBasicTabProps = {
  edgeId: string;
  edgeType: WaldiezEdgeType;
  data: WaldiezEdgeData;
  onTypeChange: (
    option: SingleValue<{
      label: string;
      value: WaldiezEdgeType;
    }>
  ) => void;
  onDataChange: (data: Partial<WaldiezEdgeData>) => void;
};

export type WaldiezEdgeBasicTabViewProps = {
  edgeId: string;
  edgeType: WaldiezEdgeType;
  data: WaldiezEdgeData;
  onEdgeTypeChange: (
    option: SingleValue<{
      label: string;
      value: WaldiezEdgeType;
    }>
  ) => void;
  onLabelChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClearHistoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxTurnsChange: (value: number | null) => void;
  onSummaryMethodChange: (
    option: SingleValue<{
      label: string;
      value: WaldiezEdgeLlmSummaryMethod;
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
