/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { agentNodes, createdAt, edges, flowId, nodes, updatedAt, userInput } from "./data";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { ReactFlowProvider } from "@xyflow/react";

import { HotkeysProvider } from "react-hotkeys-hook";

import { WaldiezFlowView } from "@waldiez/containers/flow";
import { SidebarProvider } from "@waldiez/containers/sidebar";
import { WaldiezProvider } from "@waldiez/store";
import { WaldiezThemeProvider, setIsDarkMode } from "@waldiez/theme";

const onRun = vi.fn();
const onChange = vi.fn();
const onUserInput = vi.fn();

const renderFlow = (
    includeUserInput: boolean = false,
    singleAgent: boolean = false,
    noAgents: boolean = false,
    readOnly: boolean = false,
) => {
    const nodesToUse = noAgents ? [] : singleAgent ? [agentNodes[0]] : nodes;
    const edgesToUse = singleAgent ? [] : edges;
    render(
        <WaldiezThemeProvider>
            <HotkeysProvider initiallyActiveScopes={[flowId]}>
                <ReactFlowProvider>
                    <SidebarProvider>
                        <WaldiezProvider
                            flowId={flowId}
                            storageId={flowId}
                            name="Test Flow"
                            description="Test Description"
                            requirements={["Test Requirement"]}
                            tags={["Test Tag"]}
                            nodes={nodesToUse}
                            edges={edgesToUse}
                            viewport={{ zoom: 1, x: 50, y: 50 }}
                            createdAt={createdAt}
                            updatedAt={updatedAt}
                            onChange={onChange}
                            onRun={onRun}
                            isReadOnly={readOnly}
                        >
                            <WaldiezFlowView
                                flowId={flowId}
                                onUserInput={onUserInput}
                                inputPrompt={includeUserInput ? userInput : null}
                            />
                        </WaldiezProvider>
                    </SidebarProvider>
                </ReactFlowProvider>
            </HotkeysProvider>
        </WaldiezThemeProvider>,
    );
};

afterEach(() => {
    vi.resetAllMocks();
});

describe("WaldiezFlow", () => {
    it("should render the component", () => {
        renderFlow();
        expect(screen.getByTestId(`rf-root-${flowId}`)).toBeTruthy();
    });
    it("should switch to models view", () => {
        renderFlow();
        expect(screen.queryByTestId("add-model-node")).toBeNull();
        fireEvent.click(screen.getByTestId("show-models"));
        expect(screen.getByTestId("add-model-node")).toBeTruthy();
    });
    it("should switch to skills view", () => {
        renderFlow();
        expect(screen.queryByTestId("add-skill-node")).toBeNull();
        fireEvent.click(screen.getByTestId("show-skills"));
        expect(screen.getByTestId("add-skill-node")).toBeTruthy();
    });
    it("should handle export flow", async () => {
        act(() => {
            renderFlow();
        });
        await userEvent.click(screen.getByTestId(`export-flow-${flowId}-button`));
        // fireEvent.click(screen.getByTestId(`export-flow-${flowId}`));
        expect(window.URL.createObjectURL).toHaveBeenCalled();
        expect(window.URL.revokeObjectURL).toHaveBeenCalled();
    });
    it("should handle run flow", async () => {
        act(() => {
            renderFlow();
        });
        await userEvent.click(screen.getByTestId(`run-${flowId}`));
        expect(onRun).toBeCalledTimes(1);
    });
    it("should not call on run if there is no agent node", async () => {
        act(() => {
            renderFlow(true, false, true);
        });
        await userEvent.click(screen.getByTestId(`run-${flowId}`));
        expect(onRun).not.toBeCalled();
    });
    it("should not call on run if there is one agent node", async () => {
        act(() => {
            renderFlow(false, true);
        });
        await userEvent.click(screen.getByTestId(`run-${flowId}`));
        expect(onRun).not.toBeCalled();
    });
    it("should toggle dark mode", () => {
        act(() => {
            renderFlow();
        });
        setIsDarkMode(false);
        expect(document.body).toHaveClass("waldiez-light");
        fireEvent.click(screen.getByTestId(`toggle-theme-${flowId}`));
        expect(document.body).toHaveClass("waldiez-dark");
    });
    it("should delete an agent with Delete key", () => {
        act(() => {
            renderFlow();
        });
        fireEvent.keyDown(screen.getByTestId("rf__node-agent-0"), {
            key: "Delete",
            code: "Delete",
        });
        expect(screen.queryByTestId("rf__node-agent-0")).toBeNull();
    });
    it("should delete a model with Delete key", () => {
        act(() => {
            renderFlow();
        });
        fireEvent.click(screen.getByTestId("show-models"));
        fireEvent.click(screen.getByTestId("add-model-node"));
        fireEvent.keyDown(screen.getByTestId("rf__node-model-0"), {
            key: "Delete",
            code: "Delete",
        });
        expect(screen.queryByTestId("rf__node-model-0")).toBeNull();
    });
    it("should delete a skill with Delete key", () => {
        act(() => {
            renderFlow();
        });
        fireEvent.click(screen.getByTestId("show-skills"));
        fireEvent.click(screen.getByTestId("add-skill-node"));
        fireEvent.keyDown(screen.getByTestId("rf__node-skill-0"), {
            key: "Delete",
            code: "Delete",
        });
        expect(screen.queryByTestId("rf__node-skill-0")).toBeNull();
    });
    it("should delete an edge with Delete key", () => {
        act(() => {
            renderFlow();
        });
        fireEvent.keyDown(screen.getByTestId("rf__edge-edge-0"), {
            key: "Delete",
            code: "Delete",
        });
        expect(screen.queryByTestId("rf__edge-edge-0")).toBeNull();
    });
    it("should handle viewport change on zoom", () => {
        act(() => {
            renderFlow();
        });
        vi.advanceTimersByTime(200);
        fireEvent.click(screen.getByTestId("show-skills"));
        const rfRoot = screen.getByTestId(`rf-root-${flowId}`);
        expect(rfRoot).toBeTruthy();
        const zoomInButton = rfRoot.querySelector(".react-flow__controls-zoomin");
        expect(zoomInButton).toBeTruthy();
        fireEvent.click(zoomInButton as Element);
        vi.advanceTimersByTime(200);
    });
});

describe("WaldiezFlow - ReadOnly", () => {
    it("should render the component", () => {
        renderFlow(false, false, false, true);
        expect(screen.getByTestId(`rf-root-${flowId}`)).toBeTruthy();
    });
    it("should not show add model node button", () => {
        renderFlow(false, false, false, true);
        fireEvent.click(screen.getByTestId("show-models"));
        expect(screen.queryByTestId("add-model-node")).toBeNull();
    });
    it("should not show add skill node button", () => {
        renderFlow(false, false, false, true);
        fireEvent.click(screen.getByTestId("show-skills"));
        expect(screen.queryByTestId("add-skill-node")).toBeNull();
    });
    it("should not show run button", () => {
        renderFlow(false, false, false, true);
        expect(screen.queryByTestId(`run-${flowId}`)).toBeNull();
    });
    it("should not show export button", () => {
        renderFlow(false, false, false, true);
        expect(screen.queryByTestId(`export-flow-${flowId}-button`)).toBeNull();
    });
    it("should not delete agent node", () => {
        renderFlow(false, false, false, true);
        fireEvent.keyDown(screen.getByTestId("rf__node-agent-0"), {
            key: "Delete",
            code: "Delete",
        });
        expect(screen.queryByTestId("rf__node-agent-0")).toBeTruthy();
    });
    it("should not delete model node", () => {
        renderFlow(false, false, false, true);
        fireEvent.click(screen.getByTestId("show-models"));
        fireEvent.keyDown(screen.getByTestId("rf__node-model-0"), {
            key: "Delete",
            code: "Delete",
        });
        expect(screen.queryByTestId("rf__node-model-0")).toBeTruthy();
    });
    it("should not delete skill node", () => {
        renderFlow(false, false, false, true);
        fireEvent.click(screen.getByTestId("show-skills"));
        fireEvent.keyDown(screen.getByTestId("rf__node-skill-0"), {
            key: "Delete",
            code: "Delete",
        });
        expect(screen.queryByTestId("rf__node-skill-0")).toBeTruthy();
    });
    it("should not delete edge", () => {
        renderFlow(false, false, false, true);
        fireEvent.keyDown(screen.getByTestId("rf__edge-edge-0"), {
            key: "Delete",
            code: "Delete",
        });
        expect(screen.queryByTestId("rf__edge-edge-0")).toBeTruthy();
    });
});
