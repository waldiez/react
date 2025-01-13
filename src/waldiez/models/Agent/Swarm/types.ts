import { Node } from "@xyflow/react";

import { WaldiezAgentCommonData } from "@waldiez/models/Agent/Common";
import { WaldiezSwarmAfterWork } from "@waldiez/models/Agent/Swarm/AfterWork";
import { WaldiezSwarmOnCondition } from "@waldiez/models/Agent/Swarm/OnCondition";
import { WaldiezSwarmUpdateSystemMessage } from "@waldiez/models/Agent/Swarm/UpdateSystemMessage";

export type WaldiezSwarmAfterWorkRecipientType = "agent" | "option" | "callable";
export type WaldiezSwarmAfterWorkOption = "TERMINATE" | "REVERT_TO_USER" | "STAY";
export type WaldiezSwarmOnConditionTargetType = "agent" | "nested_chat";
export type WaldiezSwarmOnConditionAvailableCheckType = "string" | "callable" | "none";
export type WaldiezSwarmUpdateSystemMessageType = "string" | "callable";
export type WaldiezSwarmHandoff = WaldiezSwarmAfterWork | WaldiezSwarmOnCondition;

export type WaldiezNodeAgentSwarmData = WaldiezAgentCommonData & {
    label: string;
    agentType: "swarm";
    functions: string[]; //skill Ids
    updateAgentStateBeforeReply: Array<WaldiezSwarmUpdateSystemMessage | string>;
    handoffs: WaldiezSwarmHandoff[];
};

export type WaldiezNodeAgentSwarmContainerData = WaldiezAgentCommonData & {
    label: string;
    agentType: "swarm_container";
    initialAgent: string | null;
    maxRounds: number;
    afterWork: WaldiezSwarmAfterWork | null;
    contextVariables: { [key: string]: string };
};

export type WaldiezNodeAgentSwarm = Node<WaldiezNodeAgentSwarmData, "agent">;
export type WaldiezNodeAgentSwarmContainer = Node<WaldiezNodeAgentSwarmContainerData, "agent">;
