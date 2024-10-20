import { useState } from 'react';

import { WaldieEdgeModalProps } from '@waldiez/components/edges/modal/types';
import { WaldieEdgeModalView } from '@waldiez/components/edges/modal/view';
import { SingleValue } from '@waldiez/components/inputs';
import { WaldieEdge, WaldieEdgeData, WaldieEdgeType } from '@waldiez/models';
import { useWaldieContext } from '@waldiez/store';

export const WaldieEdgeModal = (props: WaldieEdgeModalProps) => {
  const { edgeId, isOpen, flowId, darkMode, onClose } = props;
  const getEdgeSourceAgent = useWaldieContext(selector => selector.getEdgeSourceAgent);
  const updateEdgeData = useWaldieContext(selector => selector.updateEdgeData);
  const updateEdgeType = useWaldieContext(selector => selector.updateEdgeType);
  const getEdgeById = useWaldieContext(selector => selector.getEdgeById);
  const edge = getEdgeById(edgeId) as WaldieEdge | null;
  const [edgeType, setEdgeType] = useState<'chat' | 'nested' | 'group' | 'hidden'>(edge?.type ?? 'chat');
  const [edgeData, setEdgeData] = useState<WaldieEdgeData | undefined>(edge?.data);
  const sourceAgent = edge ? getEdgeSourceAgent(edge) : null;
  const isRagUser = sourceAgent?.data?.agentType === 'rag_user';
  const onDataChange = (data: Partial<WaldieEdgeData>) => {
    if (edgeData) {
      setEdgeData({
        ...edgeData,
        ...data
      });
    }
  };
  const onTypeChange = (
    option: SingleValue<{
      label: string;
      value: WaldieEdgeType;
    }>
  ) => {
    if (option && edge) {
      setEdgeType(option.value);
    }
  };
  const onCancel = () => {
    setEdgeData(edge?.data);
    onClose();
  };
  const onSubmit = () => {
    if (edgeData) {
      updateEdgeData(edgeId, edgeData);
    }
    if (edge) {
      if (edgeType !== edge.type) {
        updateEdgeType(edgeId, edgeType);
      }
    }
    onClose();
  };
  if (!edgeData || !edge || edgeType === 'hidden') {
    return <></>;
  }
  return (
    <WaldieEdgeModalView
      flowId={flowId}
      edgeId={edgeId}
      edgeType={edgeType}
      data={edgeData}
      isOpen={isOpen}
      darkMode={darkMode}
      sourceIsRagUser={isRagUser}
      onTypeChange={onTypeChange}
      onDataChange={onDataChange}
      onCancel={onCancel}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  );
};
