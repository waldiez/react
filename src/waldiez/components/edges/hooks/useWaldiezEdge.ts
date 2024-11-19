import { EdgeProps, getBezierPath } from '@xyflow/react';

import { WaldiezAgentNode, WaldiezAgentNodeType, WaldiezEdge, WaldiezEdgeType } from '@waldiez/models';
import { useWaldiezContext } from '@waldiez/store';
import { AGENT_COLORS } from '@waldiez/theme';

export const useWaldiezEdge = (props: EdgeProps<WaldiezEdge> & { type: WaldiezEdgeType }) => {
  const { id, source, type, data, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } =
    props;
  const deleteEdge = useWaldiezContext(selector => selector.deleteEdge);
  const getEdgeById = useWaldiezContext(selector => selector.getEdgeById);
  const getAgentById = useWaldiezContext(selector => selector.getAgentById);
  const onEdgeDoubleClick = useWaldiezContext(selector => selector.onEdgeDoubleClick);
  const updateEdgeData = useWaldiezContext(selector => selector.updateEdgeData);
  const sourceAgent = getAgentById(source) as WaldiezAgentNode | null;
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });
  const onOpenModal = (event: React.MouseEvent) => {
    const edge = getEdgeById(id);
    if (edge) {
      onEdgeDoubleClick(event, edge);
    }
  };
  const onDelete = () => {
    deleteEdge(id);
  };
  const getEdgeColor = () => {
    let edgeColor;
    if (sourceAgent) {
      const agentType = sourceAgent.data.agentType as WaldiezAgentNodeType;
      if (['user', 'assistant', 'manager', 'rag_user'].includes(agentType)) {
        edgeColor = AGENT_COLORS[agentType];
      }
    }
    return edgeColor;
  };
  const getEdgeNumber = () => {
    let edgeNumber = '';
    if (!sourceAgent || !data) {
      return edgeNumber;
    }
    if (type === 'chat') {
      edgeNumber =
        typeof data.order === 'number'
          ? data.order >= 1
            ? `${data.order}`
            : data.order === 0
              ? '1'
              : '0'
          : '0';
    } else if (type === 'nested') {
      const sourceInitial = (sourceAgent.data.label as string).charAt(0).toUpperCase();
      edgeNumber = `${sourceInitial}.${data.position}`;
    }
    return edgeNumber;
  };
  const onDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const edge = getEdgeById(id);
    if (edge) {
      updateEdgeData(id, { ...edge.data, description: event.target.value });
    }
  };
  return {
    edgePath,
    labelX,
    labelY,
    sourceAgent,
    onOpenModal,
    onDelete,
    getEdgeColor,
    getEdgeNumber,
    onDescriptionChange
  };
};
