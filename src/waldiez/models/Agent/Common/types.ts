export type WaldiezAgentHumanInputMode = "ALWAYS" | "NEVER" | "TERMINATE";
export type WaldiezAgentCodeExecutionConfigDict = {
    workDir?: string;
    useDocker?: string | string[] | boolean;
    timeout?: number;
    lastNMessages?: number | "auto";
    functions?: string[];
};
export type WaldiezAgentCodeExecutionConfig = WaldiezAgentCodeExecutionConfigDict | false;
export type WaldiezAgentTypeTerminationTypeOption = "none" | "keyword" | "method";
export type WaldiezAgentTerminationCriterionOption = "found" | "ending" | "exact";
export type WaldiezAgentNestedChat = {
    triggeredBy: string[];
    messages: { id: string; isReply: boolean }[];
};
export type WaldiezAgentTerminationMessageCheck = {
    type: WaldiezAgentTypeTerminationTypeOption;
    keywords: string[];
    criterion: WaldiezAgentTerminationCriterionOption | null;
    methodContent: string | null;
};
export type WaldiezAgentLinkedSkill = {
    id: string;
    executorId: string;
};
export type WaldiezAgentCommonData = {
    name: string;
    description: string;
    parentId: string | undefined | null;
    agentType: WaldiezNodeAgentType;
    systemMessage: string | null;
    humanInputMode: WaldiezAgentHumanInputMode;
    codeExecutionConfig: WaldiezAgentCodeExecutionConfig;
    agentDefaultAutoReply: string | null;
    maxConsecutiveAutoReply: number | null;
    termination: WaldiezAgentTerminationMessageCheck;
    nestedChats: WaldiezAgentNestedChat[];
    // links
    modelIds: string[];
    skills: WaldiezAgentLinkedSkill[];
    // meta
    tags: string[];
    requirements: string[];
    createdAt: string;
    updatedAt: string;
};

export type WaldiezAgentType = "user" | "assistant" | "manager" | "rag_user" | "swarm";

export type WaldiezNodeAgentType = WaldiezAgentType | "swarm_container";
