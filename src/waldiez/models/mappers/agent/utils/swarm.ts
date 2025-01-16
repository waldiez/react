import { WaldiezSwarmAfterWork, WaldiezSwarmUpdateSystemMessage } from "@waldiez/models";

export const getSwarmFunctions = (jsonData: any): string[] => {
    const functions: string[] = [];
    if (jsonData && jsonData.functions && Array.isArray(jsonData.functions)) {
        jsonData.functions.forEach((func: any) => {
            if (typeof func === "string") {
                functions.push(func);
            }
        });
    }
    return functions;
};

export const getSwarmUpdateAgentStateBeforeReply = (jsonData: any): WaldiezSwarmUpdateSystemMessage[] => {
    const updateAgentStateBeforeReply: WaldiezSwarmUpdateSystemMessage[] = [];
    if (
        jsonData &&
        jsonData.updateAgentStateBeforeReply &&
        Array.isArray(jsonData.updateAgentStateBeforeReply)
    ) {
        jsonData.updateAgentStateBeforeReply.forEach((message: any) => {
            if (typeof message === "object") {
                if (
                    "updateFunctionType" in message &&
                    "updateFunction" in message &&
                    typeof message.updateFunctionType === "string" &&
                    ["string", "callable"].includes(message.updateFunctionType) &&
                    typeof message.updateFunction === "string"
                ) {
                    updateAgentStateBeforeReply.push({
                        updateFunctionType: message.updateFunctionType,
                        updateFunction: message.updateFunction,
                    });
                }
            }
        });
    }
    return updateAgentStateBeforeReply;
};

export const getIsInitial = (jsonData: any): boolean => {
    if (typeof jsonData === "object" && "isInitial" in jsonData) {
        return typeof jsonData.isInitial === "boolean" ? jsonData.isInitial : false;
    }
    return false;
};

export const getSwarmHandoffs = (jsonData: any): any[] => {
    // split into two functions
    const handoffs: any[] = [];
    if (jsonData && jsonData.handoffs && Array.isArray(jsonData.handoffs)) {
        // export type WaldiezSwarmHandoff = WaldiezSwarmAfterWork | WaldiezSwarmOnCondition;
        jsonData.handoffs.forEach((handoff: any) => {
            if (typeof handoff === "object") {
                if (
                    "recipientType" in handoff &&
                    "recipient" in handoff &&
                    typeof handoff.recipientType === "string" &&
                    typeof handoff.recipient === "string" &&
                    ["agent", "option", "callable"].includes(handoff.recipientType)
                ) {
                    // afterWork?
                    const afterWork = getSwarmAfterWorkHandoff(handoff);
                    if (afterWork) {
                        handoffs.push(afterWork);
                    }
                } else if (
                    "target" in handoff &&
                    "targetType" in handoff &&
                    "condition" in handoff &&
                    "available" in handoff
                ) {
                    // onCondition ?
                    const onCondition = getSwarmOnConditionHandoff(handoff);
                    if (onCondition) {
                        handoffs.push(onCondition);
                    }
                }
            }
        });
    }
    return handoffs;
};

const getSwarmAfterWorkHandoff = (handoff: any): WaldiezSwarmAfterWork | null => {
    if (handoff.recipientType === "option") {
        if (["TERMINATE", "REVERT_TO_USER", "STAY", "SWARM_MANAGER"].includes(handoff.recipient)) {
            return handoff as WaldiezSwarmAfterWork;
            // handoffs.push(handoff);
        }
    } else if (handoff.recipientType === "callable" || handoff.recipientType === "agent") {
        // handoffs.push(handoff);
    }
    return null;
};

const getSwarmOnConditionHandoff = (handoff: any): any => {
    const targetType = handoff.targetType;
    if (["agent", "nested_chat"].includes(targetType)) {
        // if the target type is nested chat, the target must be a { [key: string]: any }
        // if the target type is agent, the target must be a string
        if (
            (targetType === "nested_chat" && typeof handoff.target === "object") ||
            (targetType === "agent" && typeof handoff.target === "string")
        ) {
            if (
                typeof handoff.condition === "string" &&
                typeof handoff.available === "object" &&
                handoff.available &&
                "type" in handoff.available &&
                "value" in handoff.available &&
                ["string", "callable", "none"].includes(handoff.available.type)
            ) {
                return handoff;
            }
        }
    }
    return null;
};
