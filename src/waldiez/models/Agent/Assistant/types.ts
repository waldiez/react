import { Node } from "@xyflow/react";

import { WaldiezAgentCommonData } from "@waldiez/models/Agent/Common";

export type WaldiezNodeAgentAssistantData = WaldiezAgentCommonData & {
    label: string;
};

export type WaldiezNodeAgentAssistant = Node<WaldiezNodeAgentAssistantData, "agent">;
