/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import {
    WaldiezAgentCodeExecutionConfig,
    WaldiezAgentData,
    WaldiezAgentHumanInputMode,
    WaldiezAgentLinkedSkill,
    WaldiezAgentNestedChat,
    WaldiezAgentTerminationMessageCheck,
} from "@waldiez/models/Agent/Common";
import { WaldiezReasoningAgentReasonConfig } from "@waldiez/models/Agent/Reasoning/types";

export class WaldiezAgentReasoningData extends WaldiezAgentData {
    verbose: boolean;
    reasonConfig: WaldiezReasoningAgentReasonConfig;

    constructor(props: {
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
        verbose: boolean;
        reasonConfig: WaldiezReasoningAgentReasonConfig;
    }) {
        super(props);
        this.verbose = props.verbose;
        this.reasonConfig = props.reasonConfig;
    }
}
