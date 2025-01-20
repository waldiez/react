import {
    WaldiezAgentCodeExecutionConfig,
    WaldiezAgentData,
    WaldiezAgentHumanInputMode,
    WaldiezAgentLinkedSkill,
    WaldiezAgentNestedChat,
    WaldiezAgentTerminationMessageCheck,
} from "@waldiez/models/Agent/Common";
import { WaldiezAgentGroupManagerSpeakers } from "@waldiez/models/Agent/GroupManager/GroupSpeakers";

/**
 * Waldiez Group Manager Agent Data.
 * @param humanInputMode - The human input mode of the agent ("NEVER" | "ALWAYS" | "SOMETIMES")
 * @param systemMessage - The system message of the agent
 * @param codeExecutionConfig - The code execution configuration of the agent
 * @param agentDefaultAutoReply - The default auto reply of the agent
 * @param maxConsecutiveAutoReply - The maximum consecutive auto reply of the agent
 * @param termination - The termination message check of the agent
 * @param modelIds - The model ids of the agent
 * @param skills - The linked skills of the agent
 * @param parentId - The parent id of the agent
 * @param nestedChats - The nested chats of the agent
 * @param maxRound - The maximum round of the agent
 * @param adminName - The admin name of the agent
 * @param speakers - The speakers of the agent
 * @param enableClearHistory - The enable clear history of the agent
 * @param sendIntroductions - The send introductions of the agent
 * @see {@link WaldiezAgentData}
 * @see {@link WaldiezAgentLinkedSkill}
 * @see {@link WaldiezAgentNestedChat}
 * @see {@link WaldiezAgentTerminationMessageCheck}
 * @see {@link WaldiezAgentGroupManagerSpeakers}
 * @see {@link WaldiezAgentHumanInputMode}
 * @see {@link WaldiezAgentCodeExecutionConfig}
 */
export class WaldiezAgentGroupManagerData extends WaldiezAgentData {
    maxRound: number | null;
    adminName: string | null;
    speakers: WaldiezAgentGroupManagerSpeakers;
    enableClearHistory?: boolean;
    sendIntroductions?: boolean;

    constructor(
        props: {
            humanInputMode: WaldiezAgentHumanInputMode;
            systemMessage: string | null;
            codeExecutionConfig: WaldiezAgentCodeExecutionConfig;
            agentDefaultAutoReply: string | null;
            maxConsecutiveAutoReply: number | null;
            termination: WaldiezAgentTerminationMessageCheck;
            modelIds: string[];
            skills: WaldiezAgentLinkedSkill[];
            parentId: string | null;
            nestedChats: WaldiezAgentNestedChat[];
            maxRound: number | null;
            adminName: string | null;
            speakers: WaldiezAgentGroupManagerSpeakers;
            enableClearHistory?: boolean;
            sendIntroductions?: boolean;
        } = {
            humanInputMode: "NEVER",
            systemMessage: null,
            codeExecutionConfig: false,
            agentDefaultAutoReply: null,
            maxConsecutiveAutoReply: null,
            termination: {
                type: "none",
                keywords: [],
                criterion: null,
                methodContent: null,
            },
            modelIds: [],
            skills: [],
            parentId: null,
            nestedChats: [],
            maxRound: null,
            adminName: null,
            speakers: {
                selectionMethod: "auto",
                selectionCustomMethod: "",
                maxRetriesForSelecting: null,
                selectionMode: "repeat",
                allowRepeat: true,
                allowedOrDisallowedTransitions: {},
                transitionsType: "allowed",
            },
            enableClearHistory: undefined,
            sendIntroductions: undefined,
        },
    ) {
        super(props);
        this.maxRound = props.maxRound;
        this.adminName = props.adminName;
        this.speakers = props.speakers;
        this.enableClearHistory = props.enableClearHistory;
        this.sendIntroductions = props.sendIntroductions;
    }
}
