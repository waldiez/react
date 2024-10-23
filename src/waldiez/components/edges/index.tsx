import { EdgeProps } from '@xyflow/react';

import { WaldiezEdgeView } from '@waldiez/components/edges/view';
import { WaldiezAgentNode, WaldiezEdge, WaldiezEdgeType } from '@waldiez/models';
import { useWaldiezContext } from '@waldiez/store';

const WaldiezEdgeCommon = (props: EdgeProps<WaldiezEdge> & { type: WaldiezEdgeType }) => {
  const { id, source, type } = props;
  const deleteEdge = useWaldiezContext(selector => selector.deleteEdge);
  const getEdgeById = useWaldiezContext(selector => selector.getEdgeById);
  const getAgentById = useWaldiezContext(selector => selector.getAgentById);
  const onEdgeDoubleClick = useWaldiezContext(selector => selector.onEdgeDoubleClick);
  const sourceAgent = getAgentById(source) as WaldiezAgentNode | null;
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
    <WaldiezEdgeView
      {...props}
      type={type}
      sourceAgent={sourceAgent}
      onOpenModal={onOpenModal}
      onDelete={onDelete}
    />
  );
};

export const WaldiezEdgeChat = (props: EdgeProps<WaldiezEdge>) => {
  return <WaldiezEdgeCommon {...props} type="chat" />;
};

export const WaldiezEdgeGroup = (props: EdgeProps<WaldiezEdge>) => {
  return <WaldiezEdgeCommon {...props} type="group" />;
};

export const WaldiezEdgeNested = (props: EdgeProps<WaldiezEdge>) => {
  return <WaldiezEdgeCommon {...props} type="nested" />;
};

export const WaldiezEdgeHidden = (props: EdgeProps<WaldiezEdge>) => {
  return <WaldiezEdgeCommon {...props} type="hidden" />;
};
