import { Node, NodeChange } from "@xyflow/react";

import { WaldiezNodeType } from "@waldiez/types";

export interface IWaldiezNodeStore {
    onNodesChange: (changes: NodeChange[]) => void;
    showNodes: (nodeType: WaldiezNodeType) => void;
    reselectNode: (id: string) => void;
    onNodeDoubleClick: (event: any, node: Node) => void;
}
