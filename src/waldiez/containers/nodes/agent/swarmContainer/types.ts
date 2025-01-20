import { NodeProps } from "@xyflow/react";

import { WaldiezNodeAgent } from "@waldiez/models";

export type WaldiezSwarmContainerProps = NodeProps<WaldiezNodeAgent> & {
    isNodeModalOpen: boolean;
    onOpenNodeModal: () => void;
    onCloseNodeModal: () => void;
};
