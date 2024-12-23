// a common interface to inherit from
import { Node, XYPosition } from "@xyflow/react";

export interface IWaldiezSourceNode {
    id: string;
    data: unknown;
    rest: { [key: string]: unknown };
    asNode: (position?: XYPosition) => Node;
}
