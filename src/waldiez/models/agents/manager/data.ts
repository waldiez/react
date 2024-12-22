import { WaldiezSourceAgentCommonData } from "@waldiez/models/agents/common";
import { WaldiezGroupManagerSpeakersData } from "@waldiez/models/agents/manager/speakers";
import {
    IWaldiezSourceAgentCommonData,
    IWaldiezSourceGroupManagerData,
    WaldiezAgentCodeExecutionConfig,
    WaldiezAgentHumanInputMode,
    WaldiezAgentLinkedSkill,
    WaldiezAgentNodeType,
    WaldiezAgentTeachability,
    WaldiezAgentTerminationMessageCheck,
    WaldiezGroupManagerSpeakers,
} from "@waldiez/models/types/";

export class WaldiezSourceGroupManagerData
    extends WaldiezSourceAgentCommonData
    implements IWaldiezSourceGroupManagerData
{
    agentType: WaldiezAgentNodeType;
    name: string;
    systemMessage: string | null;
    humanInputMode: WaldiezAgentHumanInputMode;
    description: string;
    codeExecutionConfig: WaldiezAgentCodeExecutionConfig;
    agentDefaultAutoReply: string | null;
    maxConsecutiveAutoReply: number | null;
    termination: WaldiezAgentTerminationMessageCheck;
    teachability: WaldiezAgentTeachability;
    modelIds: string[];
    skills: WaldiezAgentLinkedSkill[];
    tags: string[];
    requirements: string[];
    createdAt: string;
    updatedAt: string;
    parentId: string | null;
    // manager specific fields
    maxRound: number | null;
    adminName: string | null;
    speakers: WaldiezGroupManagerSpeakers;
    enableClearHistory?: boolean;
    sendIntroductions?: boolean;

    /* eslint-disable max-statements,complexity */
    constructor(
        name: string = "Manager",
        systemMessage: string | null = null,
        humanInputMode: WaldiezAgentHumanInputMode = "NEVER",
        description: string = "A group manager agent",
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
        maxRound: number | null = null,
        adminName: string | null = null,
        speakers: WaldiezGroupManagerSpeakers = {
            selectionMethod: "auto",
            selectionCustomMethod: "",
            maxRetriesForSelecting: null,
            selectionMode: "repeat",
            allowRepeat: true,
            allowedOrDisallowedTransitions: {},
            transitionsType: "allowed",
        },
        enableClearHistory: boolean | undefined = undefined,
        sendIntroductions: boolean | undefined = undefined,
    ) {
        super(
            name,
            "manager",
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
        );
        this.name = name;
        this.systemMessage = systemMessage;
        this.humanInputMode = humanInputMode;
        this.description = description;
        this.codeExecutionConfig = codeExecutionConfig;
        this.agentDefaultAutoReply = agentDefaultAutoReply;
        this.maxConsecutiveAutoReply = maxConsecutiveAutoReply;
        this.termination = termination;
        this.teachability = teachability;
        this.modelIds = modelIds;
        this.skills = skills;
        this.tags = tags;
        this.requirements = requirements;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.parentId = parentId;
        this.maxRound = maxRound;
        this.adminName = adminName;
        this.speakers = speakers;
        this.enableClearHistory = enableClearHistory;
        this.sendIntroductions = sendIntroductions;
        this.agentType = "manager";
    }
    static getSpeakers = (json: any): WaldiezGroupManagerSpeakers => {
        const speakersData = WaldiezGroupManagerSpeakersData.fromJSON(json);
        return speakersData.data;
    };
    static getMaxRound = (json: any): number | null => {
        if ("maxRound" in json && typeof json.maxRound === "number") {
            return json.maxRound;
        }
        return null;
    };
    static getAdminName = (json: any): string | null => {
        if ("adminName" in json && typeof json.adminName === "string") {
            return json.adminName;
        }
        return null;
    };
    static getEnableClearHistory = (json: any): boolean | undefined => {
        if ("enableClearHistory" in json && typeof json.enableClearHistory === "boolean") {
            return json.enableClearHistory;
        }
        return undefined;
    };
    static getSendIntroductions = (json: any): boolean | undefined => {
        if ("sendIntroductions" in json && typeof json.sendIntroductions === "boolean") {
            return json.sendIntroductions;
        }
        return undefined;
    };
    static getAgentNameFromJSON = (
        json: any,
        name: string | null,
        inherited: IWaldiezSourceAgentCommonData,
    ): string => {
        let agentName: string = name ?? inherited.name;
        if ("name" in json && typeof json.name === "string") {
            agentName = json.name;
        } else if ("label" in json && typeof json.label === "string") {
            agentName = json.label;
        }
        return agentName;
    };
    static fromJSON = (json: unknown, name: string | null = null): IWaldiezSourceGroupManagerData => {
        if (!json || typeof json !== "object") {
            return new WaldiezSourceGroupManagerData();
        }
        const inherited = WaldiezSourceAgentCommonData.fromJSON(json, "manager", name ?? "Manager");
        const speakers = WaldiezSourceGroupManagerData.getSpeakers(json);
        const maxRound = WaldiezSourceGroupManagerData.getMaxRound(json);
        const adminName = WaldiezSourceGroupManagerData.getAdminName(json);
        const enableClearHistory = WaldiezSourceGroupManagerData.getEnableClearHistory(json);
        const sendIntroductions = WaldiezSourceGroupManagerData.getSendIntroductions(json);
        const agentName = WaldiezSourceGroupManagerData.getAgentNameFromJSON(json, name, inherited);
        return new WaldiezSourceGroupManagerData(
            agentName,
            inherited.systemMessage,
            inherited.humanInputMode,
            inherited.description,
            inherited.codeExecutionConfig,
            inherited.agentDefaultAutoReply,
            inherited.maxConsecutiveAutoReply,
            inherited.termination,
            inherited.teachability,
            inherited.modelIds,
            inherited.skills,
            inherited.tags,
            inherited.requirements,
            inherited.createdAt,
            inherited.updatedAt,
            inherited.parentId,
            maxRound,
            adminName,
            speakers,
            enableClearHistory,
            sendIntroductions,
        );
    };
}
