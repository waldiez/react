import { WaldiezSourceUserProxyOrAssistantData } from "@waldiez/models/agents/common/userProxyOrAssistant";
import {
    IWaldiezSourceUserProxyData,
    WaldiezAgentCodeExecutionConfig,
    WaldiezAgentHumanInputMode,
    WaldiezAgentLinkedSkill,
    WaldiezAgentNestedChat,
    WaldiezAgentNodeType,
    WaldiezAgentTeachability,
    WaldiezAgentTerminationMessageCheck,
} from "@waldiez/models/types";

export class WaldiezSourceUserProxyData
    extends WaldiezSourceUserProxyOrAssistantData
    implements IWaldiezSourceUserProxyData
{
    agentType: "user" | "assistant";

    constructor(
        name: string = "User",
        systemMessage: string | null = null,
        humanInputMode: WaldiezAgentHumanInputMode = "ALWAYS",
        description: string = "A user proxy agent",
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
        nestedChats: WaldiezAgentNestedChat[] = [],
        tags: string[] = [],
        requirements: string[] = [],
        createdAt: string = new Date().toISOString(),
        updatedAt: string = new Date().toISOString(),
        parentId: string | null = null,
    ) {
        super(
            name,
            "user",
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
        this.agentType = "user";
    }

    static fromJSON = (
        json: unknown,
        _agentType: WaldiezAgentNodeType,
        name: string | null = null,
    ): WaldiezSourceUserProxyData => {
        const data = WaldiezSourceUserProxyOrAssistantData.fromJSON(json, "user", name);
        return new WaldiezSourceUserProxyData(
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
            data.nestedChats,
            data.tags,
            data.requirements,
            data.createdAt,
            data.updatedAt,
            data.parentId,
        );
    };
}
