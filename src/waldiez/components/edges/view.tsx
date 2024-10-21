import { BaseEdge, EdgeLabelRenderer, getBezierPath } from '@xyflow/react';

import { FaTrashAlt } from 'react-icons/fa';
import { FaGear, FaPeopleGroup } from 'react-icons/fa6';
import { GiNestEggs } from 'react-icons/gi';
import { GoAlert } from 'react-icons/go';
import { MdMessage } from 'react-icons/md';

import { WaldieEdgeViewProps } from '@waldiez/components/edges/types';
import { WaldieAgentNodeType } from '@waldiez/models';
import { AGENT_COLORS } from '@waldiez/theme';

export const WaldieEdgeView = (props: WaldieEdgeViewProps) => {
  const {
    id,
    data,
    sourceAgent,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    onOpenModal,
    onDelete,
    type
  } = props;
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });
  if (type === 'hidden' || !sourceAgent || !data) {
    if (type !== 'hidden') {
      console.error(`Could not find source agent for edge ${props.id}.`);
    }
    return <></>;
  }
  const getEdgeColor = () => {
    let edgeColor;
    const agentType = sourceAgent.data.agentType as WaldieAgentNodeType;
    if (['user', 'assistant', 'manager', 'rag_user'].includes(agentType)) {
      edgeColor = AGENT_COLORS[agentType];
    }
    return edgeColor;
  };
  const getEdgeNumber = () => {
    let edgeNumber = '';
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
  const getEdgeIcon = () => {
    const edgeColor = getEdgeColor();
    const edgeIcon =
      type === 'chat' ? (
        <MdMessage />
      ) : type === 'nested' ? (
        <GiNestEggs color={edgeColor} size={18} />
      ) : (
        <FaPeopleGroup />
      );
    return edgeIcon;
  };
  const edgeNumber = getEdgeNumber();
  const edgeIcon = getEdgeIcon();
  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: 'all',
            display: 'flex',
            zIndex: 10000
          }}
          className="nodrag nopan"
          data-testid={`edge-label-${id}`}
        >
          <div className="agent-edge-view">
            <div className="edge-data">
              <div className="edge-header">
                <div className="edge-position">
                  {edgeNumber === '0' ? (
                    <GoAlert size={16} className="edge-position-warning-icon" />
                  ) : (
                    edgeNumber
                  )}
                </div>
                <div className="edge-icon">{edgeIcon}</div>
              </div>
              <div className="edge-label" data-testid={`edge-${id}-label`}>
                {data.label as string}
              </div>
              <div className="spacer" />
              <div className="edge-actions">
                <div
                  role="button"
                  className="open-edge-modal"
                  data-testid={`open-edge-modal-${id}`}
                  onClick={onOpenModal}
                >
                  <FaGear />
                </div>
                <div
                  role="button"
                  onClick={onDelete}
                  className="delete-edge"
                  data-testid={`delete-edge-${id}`}
                >
                  <FaTrashAlt />
                </div>
              </div>
            </div>
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
