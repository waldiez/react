import { EditFlowModalData } from '@waldiez/components/sidebar/modals/editFlowModal/types';

export type EditFlowModalModalTabOtherProps = {
  flowId: string;
  data: EditFlowModalData;
  onDataChange: (data: Partial<EditFlowModalData>) => void;
};
