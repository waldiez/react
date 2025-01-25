/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { WaldiezNodeAgentAssistant, WaldiezNodeAgentAssistantData } from "@waldiez/models/Agent/Assistant";
import {
    WaldiezNodeAgentGroupManager,
    WaldiezNodeAgentGroupManagerData,
} from "@waldiez/models/Agent/GroupManager";
import { WaldiezNodeAgentRagUser, WaldiezNodeAgentRagUserData } from "@waldiez/models/Agent/RagUser";
import { WaldiezNodeAgentReasoning, WaldiezNodeAgentReasoningData } from "@waldiez/models/Agent/Reasoning";
import {
    WaldiezNodeAgentSwarm,
    WaldiezNodeAgentSwarmContainer,
    WaldiezNodeAgentSwarmContainerData,
    WaldiezNodeAgentSwarmData,
} from "@waldiez/models/Agent/Swarm";
import { WaldiezNodeAgentUserProxy, WaldiezNodeAgentUserProxyData } from "@waldiez/models/Agent/UserProxy";

export type * from "@waldiez/models/Agent/Assistant/types";
export type * from "@waldiez/models/Agent/Common/types";
export type * from "@waldiez/models/Agent/GroupManager/types";
export type * from "@waldiez/models/Agent/RagUser/types";
export type * from "@waldiez/models/Agent/Reasoning/types";
export type * from "@waldiez/models/Agent/Swarm/types";
export type * from "@waldiez/models/Agent/UserProxy/types";
export type WaldiezNodeAgentData =
    | WaldiezNodeAgentAssistantData
    | WaldiezNodeAgentUserProxyData
    | WaldiezNodeAgentGroupManagerData
    | WaldiezNodeAgentRagUserData
    | WaldiezNodeAgentReasoningData
    | WaldiezNodeAgentSwarmData
    | WaldiezNodeAgentSwarmContainerData;

export type WaldiezNodeAgent =
    | WaldiezNodeAgentAssistant
    | WaldiezNodeAgentGroupManager
    | WaldiezNodeAgentRagUser
    | WaldiezNodeAgentReasoning
    | WaldiezNodeAgentSwarm
    | WaldiezNodeAgentSwarmContainer
    | WaldiezNodeAgentUserProxy;
