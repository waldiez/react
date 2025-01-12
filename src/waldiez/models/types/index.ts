import { WaldiezSkillNodeData } from "@waldiez/models/types";
import {
    WaldiezModelNodeData,
    WaldiezNodeAssistantData,
    WaldiezNodeGroupManagerData,
    WaldiezNodeRagUserData,
    WaldiezNodeUserProxyData,
} from "@waldiez/models/types";
import { WaldiezAgentNode } from "@waldiez/models/types/agents";
import { WaldiezModelNode } from "@waldiez/models/types/waldiezModel";
import { WaldiezSkillNode } from "@waldiez/models/types/waldiezSkill";

export * from "@waldiez/models/types/agents";
export * from "@waldiez/models/types/waldiezEdge";
export * from "@waldiez/models/types/waldiezMessage";
export * from "@waldiez/models/types/waldiezModel";
export * from "@waldiez/models/types/waldiezSkill";
export { WaldiezMessage } from "@waldiez/models/edge/message";
export type WaldiezNodeUserOrAssistantData = WaldiezNodeAssistantData | WaldiezNodeUserProxyData;
export type WaldiezAgentNodeData =
    | WaldiezNodeAssistantData
    | WaldiezNodeUserProxyData
    | WaldiezNodeRagUserData
    | WaldiezNodeGroupManagerData;
export type WaldiezNodeData = WaldiezSkillNodeData | WaldiezModelNodeData | WaldiezAgentNodeData;

export type WaldiezNode = WaldiezModelNode | WaldiezSkillNode | WaldiezAgentNode;
export type WaldiezNodeType = "agent" | "model" | "skill";
