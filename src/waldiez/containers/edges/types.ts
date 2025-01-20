import { EdgeProps } from "@xyflow/react";

import { WaldiezEdge, WaldiezEdgeType } from "@waldiez/models";

export type WaldiezEdgeProps = EdgeProps<WaldiezEdge> & { type: WaldiezEdgeType };
