import { EdgeProps } from '@xyflow/react';

import { WaldieEdgeView } from '@waldiez/components/edges/view';
import { WaldieAgentNode, WaldieEdge, WaldieEdgeType } from '@waldiez/models';
import { useWaldieContext } from '@waldiez/store';

const WaldieEdgeCommon = (props: EdgeProps<WaldieEdge> & { type: WaldieEdgeType }) => {
  const { id, source, type } = props;
  const deleteEdge = useWaldieContext(selector => selector.deleteEdge);
  const getEdgeById = useWaldieContext(selector => selector.getEdgeById);
  const getAgentById = useWaldieContext(selector => selector.getAgentById);
  const onEdgeDoubleClick = useWaldieContext(selector => selector.onEdgeDoubleClick);
  const sourceAgent = getAgentById(source) as WaldieAgentNode | null;
  const onOpenModal = (event: React.MouseEvent) => {
    const edge = getEdgeById(id);
    if (!edge) {
      return;
    }
    onEdgeDoubleClick(event, edge);
  };
  const onDelete = () => {
    deleteEdge(id);
  };
  return (
    <WaldieEdgeView
      {...props}
      type={type}
      sourceAgent={sourceAgent}
      onOpenModal={onOpenModal}
      onDelete={onDelete}
    />
  );
};

export const WaldieEdgeChat = (props: EdgeProps<WaldieEdge>) => {
  return <WaldieEdgeCommon {...props} type="chat" />;
};

export const WaldieEdgeGroup = (props: EdgeProps<WaldieEdge>) => {
  return <WaldieEdgeCommon {...props} type="group" />;
};

export const WaldieEdgeNested = (props: EdgeProps<WaldieEdge>) => {
  return <WaldieEdgeCommon {...props} type="nested" />;
};

export const WaldieEdgeHidden = (props: EdgeProps<WaldieEdge>) => {
  return <WaldieEdgeCommon {...props} type="hidden" />;
};
