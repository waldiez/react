import { useState } from 'react';

import { WaldiezEdgeModalProps } from '@waldiez/components/edges/modal/types';
import { SingleValue } from '@waldiez/components/inputs';
import { WaldiezEdge, WaldiezEdgeData, WaldiezEdgeType } from '@waldiez/models';
import { useWaldiezContext } from '@waldiez/store';
import { isDarkMode } from '@waldiez/theme';

export const useWaldiezEdgeModal = (props: WaldiezEdgeModalProps) => {
  const { edgeId, onClose } = props;
  const getEdgeSourceAgent = useWaldiezContext(selector => selector.getEdgeSourceAgent);
  const updateEdgeData = useWaldiezContext(selector => selector.updateEdgeData);
  const updateEdgeType = useWaldiezContext(selector => selector.updateEdgeType);
  const getEdgeById = useWaldiezContext(selector => selector.getEdgeById);
  const flowId = useWaldiezContext(selector => selector.flowId);
  const storageId = useWaldiezContext(selector => selector.storageId);
  const edge = getEdgeById(edgeId) as WaldiezEdge | null;
  const [edgeType, setEdgeType] = useState<'chat' | 'nested' | 'group' | 'hidden'>(edge?.type ?? 'chat');
  const [edgeData, setEdgeData] = useState<WaldiezEdgeData | undefined>(edge?.data);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const isDark = isDarkMode(flowId, storageId ?? flowId);
  const sourceAgent = edge ? getEdgeSourceAgent(edge) : null;
  const isRagUser = sourceAgent?.data?.agentType === 'rag_user';
  const onDataChange = (data: Partial<WaldiezEdgeData>) => {
    if (edgeData) {
      setEdgeData({
        ...edgeData,
        ...data
      });
    }
    setIsDirty(
      JSON.stringify({
        ...edgeData,
        ...data
      }) !== JSON.stringify(edge?.data)
    );
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
  return {
    flowId,
    edge,
    edgeData,
    edgeType,
    isDirty,
    isRagUser,
    isDark,
    onDataChange,
    onTypeChange,
    onCancel,
    onSubmit
  };
};
