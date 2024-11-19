import { WaldiezAgentNodeData } from '@waldiez/models';
import { useWaldiezContext } from '@waldiez/store';

export const useWaldiezNodeAgentFooter = (props: {
  id: string;
  data: WaldiezAgentNodeData;
  isModalOpen: boolean;
}) => {
  const { id, isModalOpen } = props;
  const deleteAgent = useWaldiezContext(s => s.deleteAgent);
  const cloneAgent = useWaldiezContext(s => s.cloneAgent);
  const onFlowChanged = useWaldiezContext(selector => selector.onFlowChanged);
  const onDelete = () => {
    if (!isModalOpen) {
      deleteAgent(id);
      onFlowChanged();
    }
  };
  const onClone = () => {
    if (!isModalOpen) {
      cloneAgent(id);
      onFlowChanged();
    }
  };
  return {
    onDelete,
    onClone
  };
};
