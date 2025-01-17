import { WaldiezSwarmOnConditionAvailable } from "@waldiez/models";
import { WaldiezNestedChat } from "@waldiez/models/Chat";
import { messageMapper } from "@waldiez/models/mappers/chat/messageMapper";
import { swarmAfterWorkMapper } from "@waldiez/models/mappers/common";

export const getChatClearHistory = (data: { [key: string]: any }) => {
    let clearHistory = true;
    if ("clearHistory" in data && typeof data.clearHistory === "boolean") {
        clearHistory = data.clearHistory;
    }
    return clearHistory;
};

export const getChatName = (data: { [key: string]: any }) => {
    let name = "Chat";
    if ("label" in data && data.label) {
        if (typeof data.label === "string") {
            name = data.label;
        }
    }
    return name;
};

export const getChatDescription = (data: { [key: string]: any }) => {
    let description = "Chat Description";
    if ("description" in data && data.description) {
        if (typeof data.description === "string") {
            description = data.description;
        }
    }
    return description;
};

export const getChatPosition = (data: { [key: string]: any }, fallback: number) => {
    let chatPosition = fallback;
    if ("position" in data && typeof data.position === "number") {
        chatPosition = data.position;
    }
    return chatPosition;
};

export const getChatMaxTurns = (data: { [key: string]: any }) => {
    let maxTurns = null;
    if ("maxTurns" in data && typeof data.maxTurns === "number") {
        maxTurns = data.maxTurns;
    }
    return maxTurns;
};

export const getNestedChat = (data: { [key: string]: any }): WaldiezNestedChat => {
    const nestedChat = {
        message: null,
        reply: null,
    } as WaldiezNestedChat;
    if ("nestedChat" in data && data.nestedChat) {
        if ("message" in data.nestedChat && data.nestedChat.message) {
            nestedChat.message = messageMapper.importMessage({ message: data.nestedChat.message });
        }
        if ("reply" in data.nestedChat && data.nestedChat.reply) {
            nestedChat.reply = messageMapper.importMessage({ message: data.nestedChat.reply });
        }
    }
    return nestedChat;
};

export const getChatOrder = (data: { [key: string]: any }) => {
    let order = -1;
    if ("order" in data && typeof data.order === "number") {
        order = data.order >= 0 ? data.order : -1;
    }
    return order;
};

export const getChatMaxRounds = (data: { [key: string]: any }) => {
    let maxRounds = 20;
    if ("maxRounds" in data && typeof data.maxRounds === "number") {
        maxRounds = data.maxRounds;
    }
    return maxRounds;
};

export const getContextVariables = (data: { [key: string]: any }) => {
    const contextVariables: { [key: string]: string } = {};
    if ("contextVariables" in data && typeof data.contextVariables === "object") {
        Object.entries(data.contextVariables).forEach(([key, value]) => {
            if (
                typeof value === "string" ||
                typeof value === "number" ||
                typeof value === "boolean" ||
                value === null
            ) {
                contextVariables[key] = value !== null ? `${value}` : "";
            }
        });
    }
    return contextVariables;
};

export const getAvailable = (data: { [key: string]: any }) => {
    const available: WaldiezSwarmOnConditionAvailable = {
        type: "none",
        value: null,
    };
    if ("available" in data && typeof data.available === "object") {
        if (
            "type" in data.available &&
            typeof data.available.type === "string" &&
            ["string", "callable", "none"].includes(data.available.type)
        ) {
            available.type = data.available.type;
        }
        if ("value" in data.available && typeof data.available.value === "string") {
            available.value = data.available.value;
        }
    }
    return available;
};

export const getChatAfterWork = (data: { [key: string]: any }) => {
    let afterWorkData = null;
    if ("afterWork" in data && typeof data.afterWork === "object") {
        afterWorkData = swarmAfterWorkMapper.importSwarmAfterWork(data.afterWork);
    }
    return afterWorkData;
};

export const getRealSource = (data: { [key: string]: any }) => {
    let realSource = null;
    if ("realSource" in data && typeof data.realSource === "string") {
        realSource = data.realSource;
    }
    return realSource;
};

export const getRealTarget = (data: { [key: string]: any }) => {
    let realTarget = null;
    if ("realTarget" in data && typeof data.realTarget === "string") {
        realTarget = data.realTarget;
    }
    return realTarget;
};
