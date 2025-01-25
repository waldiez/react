/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Mock, afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SideBar, SidebarProvider } from "@waldiez/containers/sidebar";
import { WaldiezProvider } from "@waldiez/store";
import { WaldiezThemeProvider } from "@waldiez/theme";
import { WaldiezNodeType } from "@waldiez/types";

describe("SideBar", () => {
    let onSelectNodeType: Mock<any>;

    const renderSidebar = (selectedNodeType: WaldiezNodeType = "agent") => {
        onSelectNodeType = vi.fn();
        return render(
            <WaldiezThemeProvider>
                <SidebarProvider collapsed={false}>
                    <WaldiezProvider flowId="wf-1" nodes={[]} edges={[]}>
                        <SideBar onSelectNodeType={onSelectNodeType} selectedNodeType={selectedNodeType} />
                    </WaldiezProvider>
                </SidebarProvider>
            </WaldiezThemeProvider>,
        );
    };
    beforeEach(() => {
        document.body.classList.add("waldiez-sidebar-expanded");
    });
    afterEach(() => {
        vi.resetAllMocks();
    });
    it("should render", () => {
        renderSidebar();
        const sidebar = screen.getByTestId("sidebar-wf-1");
        expect(sidebar).toBeInTheDocument();
    });
    it("should toggle sidebar", () => {
        renderSidebar();
        const toggleButton = screen.getByTestId("sidebar-toggle");
        fireEvent.click(toggleButton);
        waitFor(() => {
            expect(toggleButton).toHaveTextContent("Open sidebar");
        });
    });
    it("should open the edit modal", () => {
        renderSidebar();
        const editButton = screen.getByTestId("edit-flow-wf-1-sidebar-button");
        fireEvent.click(editButton);
        expect(screen.getByTestId("edit-flow-modal-wf-1")).toBeInTheDocument();
    });
    it("should call onNodeTypeSelected with agent", () => {
        renderSidebar("model");
        fireEvent.click(screen.getByTestId("show-agents"));
        expect(onSelectNodeType).toBeCalledTimes(1);
    });

    it("should call onNodeTypeSelected with model", () => {
        renderSidebar();
        fireEvent.click(screen.getByTestId("show-models"));
        expect(onSelectNodeType).toBeCalledTimes(1);
    });

    it("should call onNodeTypeSelected with skill", () => {
        renderSidebar();
        fireEvent.click(screen.getByTestId("show-skills"));
        expect(onSelectNodeType).toBeCalledTimes(1);
    });
    it("should drag start", () => {
        renderSidebar();
        fireEvent.click(screen.getByTestId("show-agents"));
        fireEvent.dragStart(screen.getByTestId("user-dnd"), {
            dataTransfer: { setData: vi.fn() },
        });
        fireEvent.dragStart(screen.getByTestId("assistant-dnd"), {
            dataTransfer: { setData: vi.fn() },
        });
        fireEvent.dragStart(screen.getByTestId("manager-dnd"), {
            dataTransfer: { setData: vi.fn() },
        });
        fireEvent.dragStart(screen.getByTestId("swarm-dnd"), {
            dataTransfer: { setData: vi.fn() },
        });
    });
});
