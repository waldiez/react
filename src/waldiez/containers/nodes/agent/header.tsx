/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { FaDatabase } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

import { WaldiezNodeAgentData } from "@waldiez/models";
import { AGENT_COLORS, AGENT_ICONS } from "@waldiez/theme";

export const WaldiezNodeAgentHeader = (props: {
    id: string;
    data: WaldiezNodeAgentData;
    onOpenNodeModal: () => void;
}) => {
    const { id, data, onOpenNodeModal } = props;
    const agentType = data.agentType;
    const agentSvg =
        agentType === "assistant"
            ? AGENT_ICONS.assistant
            : agentType === "manager"
              ? AGENT_ICONS.manager
              : agentType === "swarm"
                ? AGENT_ICONS.swarm
                : AGENT_ICONS.user;
    return (
        <div className="agent-header">
            <div className="agent-header-left">
                <FaGear role="button" className="clickable" onClick={onOpenNodeModal} />
                {data.agentType === "rag_user" && <FaDatabase color={AGENT_COLORS.rag_user} />}
                <div className="agent-label" data-testid={`agent-header-label-${id}`}>
                    {data.label}
                </div>
            </div>
            <img src={agentSvg} title={data.label} alt={data.label} />
        </div>
    );
};
