import { ReactFlowInstance } from "@xyflow/react";

import { WaldiezNodeType } from "@waldiez/models";

export type SideBarProps = {
    darkMode: boolean;
    rfInstance?: ReactFlowInstance;
    typeShown: WaldiezNodeType;
    onThemeToggle: () => void;
    onTypeShownChange: (nodeType: WaldiezNodeType) => void;
};
