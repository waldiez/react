/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { useState } from "react";

import { SidebarViewProps } from "@waldiez/containers/sidebar/types";
import { useWaldiez } from "@waldiez/store";

export const useSidebarView = (props: SidebarViewProps) => {
    const { onSelectNodeType } = props;
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const flowId = useWaldiez(s => s.flowId);
    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string, agentType?: string) => {
        event.dataTransfer.setData("application/node", nodeType);
        if (nodeType === "agent") {
            event.dataTransfer.setData("application/agent", agentType ?? "user");
        }
        event.dataTransfer.effectAllowed = "move";
    };
    const onShowAgents = () => {
        onSelectNodeType("agent");
    };
    const onShowModels = () => {
        onSelectNodeType("model");
    };
    const onShowSkills = () => {
        onSelectNodeType("skill");
    };
    const onUserDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        onDragStart(event, "agent");
    };
    const onAssistantDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        onDragStart(event, "agent", "assistant");
    };
    const onManagerDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        onDragStart(event, "agent", "manager");
    };
    const onSwarmDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        onDragStart(event, "agent", "swarm");
    };
    const onOpenEditModal = () => {
        setIsEditModalOpen(true);
    };
    const onCloseEditModal = () => {
        setIsEditModalOpen(false);
    };
    return {
        flowId,
        isEditModalOpen,
        onOpenEditModal,
        onCloseEditModal,
        onShowAgents,
        onShowModels,
        onShowSkills,
        onUserDragStart,
        onAssistantDragStart,
        onManagerDragStart,
        onSwarmDragStart,
    };
};
