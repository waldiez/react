import { WaldiezSourceUserProxyOrAssistantData } from "@waldiez/models/agents/common/userProxyOrAssistant";
import {
    IWaldiezSourceAssistantData,
    WaldiezAgentCodeExecutionConfig,
    WaldiezAgentHumanInputMode,
    WaldiezAgentLinkedSkill,
    WaldiezAgentNestedChat,
    WaldiezAgentNodeType,
    WaldiezAgentTeachability,
    WaldiezAgentTerminationMessageCheck,
} from "@waldiez/models/types";

export class WaldiezSourceAssistantData
    extends WaldiezSourceUserProxyOrAssistantData
    implements IWaldiezSourceAssistantData
{
    agentType: "user" | "assistant";

    constructor(
        name: string = "Assistant",
        systemMessage: string | null = null,
        humanInputMode: WaldiezAgentHumanInputMode = "NEVER",
        description: string = "An assistant agent",
        codeExecutionConfig: WaldiezAgentCodeExecutionConfig = false,
        agentDefaultAutoReply: string | null = null,
        maxConsecutiveAutoReply: number | null = null,
        termination: WaldiezAgentTerminationMessageCheck = {
            type: "none",
            keywords: [],
            criterion: null,
            methodContent: null,
        },
        teachability: WaldiezAgentTeachability = {
            enabled: false,
            verbosity: 0,
            resetDb: false,
            recallThreshold: 0,
            maxMumRetrievals: 0,
        },
        modelIds: string[] = [],
        skills: WaldiezAgentLinkedSkill[] = [],
        tags: string[] = [],
        requirements: string[] = [],
        createdAt: string = new Date().toISOString(),
        updatedAt: string = new Date().toISOString(),
        parentId: string | null = null,
        nestedChats: WaldiezAgentNestedChat[] = [],
    ) {
        super(
            name,
            "assistant",
            systemMessage,
            humanInputMode,
            description,
            codeExecutionConfig,
            agentDefaultAutoReply,
            maxConsecutiveAutoReply,
            termination,
            teachability,
            modelIds,
            skills,
            tags,
            requirements,
            createdAt,
            updatedAt,
            parentId,
            nestedChats,
        );
        this.agentType = "assistant";
    }

    static fromJSON = (
        json: unknown,
        _agentType: WaldiezAgentNodeType,
        name: string | null = null,
    ): WaldiezSourceAssistantData => {
        const data = WaldiezSourceUserProxyOrAssistantData.fromJSON(json, "assistant", name);
        return new WaldiezSourceAssistantData(
            data.name,
            data.systemMessage,
            data.humanInputMode,
            data.description,
            data.codeExecutionConfig,
            data.agentDefaultAutoReply,
            data.maxConsecutiveAutoReply,
            data.termination,
            data.teachability,
            data.modelIds,
            data.skills,
            data.tags,
            data.requirements,
            data.createdAt,
            data.updatedAt,
            data.parentId,
            data.nestedChats,
        );
    };
}
