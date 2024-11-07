import { useState } from 'react';

import { WaldiezEdgeModalProps } from '@waldiez/components/edges/modal/types';
import { WaldiezEdgeModalView } from '@waldiez/components/edges/modal/view';
import { SingleValue } from '@waldiez/components/inputs';
import { WaldiezEdge, WaldiezEdgeData, WaldiezEdgeType } from '@waldiez/models';
import { useWaldiezContext } from '@waldiez/store';

export const WaldiezEdgeModal = (props: WaldiezEdgeModalProps) => {
  const { edgeId, isOpen, flowId, darkMode, onClose } = props;
  const getEdgeSourceAgent = useWaldiezContext(selector => selector.getEdgeSourceAgent);
  const updateEdgeData = useWaldiezContext(selector => selector.updateEdgeData);
  const updateEdgeType = useWaldiezContext(selector => selector.updateEdgeType);
  const getEdgeById = useWaldiezContext(selector => selector.getEdgeById);
  const edge = getEdgeById(edgeId) as WaldiezEdge | null;
  const [edgeType, setEdgeType] = useState<'chat' | 'nested' | 'group' | 'hidden'>(edge?.type ?? 'chat');
  const [edgeData, setEdgeData] = useState<WaldiezEdgeData | undefined>(edge?.data);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const sourceAgent = edge ? getEdgeSourceAgent(edge) : null;
  const isRagUser = sourceAgent?.data?.agentType === 'rag_user';
  const onDataChange = (data: Partial<WaldiezEdgeData>) => {
    if (edgeData) {
      setEdgeData({
        ...edgeData,
        ...data
      });
    }
    setIsDirty(JSON.stringify(data) !== JSON.stringify(edgeData));
  };
  const onTypeChange = (
    option: SingleValue<{
      label: string;
      value: WaldiezEdgeType;
    }>
  ) => {
    if (option && edge) {
      setEdgeType(option.value);
      setIsDirty(option.value !== edge.type);
    }
  };
  const onCancel = () => {
    setEdgeData(edge?.data);
    setEdgeType(edge?.type ?? 'chat');
    setIsDirty(false);
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
    setIsDirty(false);
    // onClose();
  };
  if (!edgeData || !edge || edgeType === 'hidden') {
    return <></>;
  }
  return (
    <WaldiezEdgeModalView
      flowId={flowId}
      edgeId={edgeId}
      edgeType={edgeType}
      data={edgeData}
      isOpen={isOpen}
      isDirty={isDirty}
      darkMode={darkMode}
      sourceIsRagUser={isRagUser}
      onTypeChange={onTypeChange}
      onDataChange={onDataChange}
      onCancel={onCancel}
      onSubmit={onSubmit}
      onClose={onCancel}
    />
  );
};
