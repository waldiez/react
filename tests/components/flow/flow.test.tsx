import { agentNodes, createdAt, edges, flowId, nodes, updatedAt, userInput } from "./data";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { ReactFlowProvider } from "@xyflow/react";

import { HotkeysProvider } from "react-hotkeys-hook";

import { WaldiezFlow } from "@waldiez/components/flow";
import { WaldiezProvider } from "@waldiez/store";
import * as theme from "@waldiez/theme";

const onRun = vi.fn();
const onChange = vi.fn();
const onUserInput = vi.fn();

const renderFlow = (
    includeUserInput: boolean = false,
    singleAgent: boolean = false,
    noAgents: boolean = false,
) => {
    const nodesToUse = noAgents ? [] : singleAgent ? [agentNodes[0]] : nodes;
    const edgesToUse = singleAgent ? [] : edges;
    render(
        <HotkeysProvider initiallyActiveScopes={[flowId]}>
            <ReactFlowProvider>
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
                >
                    <WaldiezFlow
                        flowId={flowId}
                        storageId={flowId}
                        onChange={onChange}
                        onRun={onRun}
                        onUserInput={onUserInput}
                        inputPrompt={includeUserInput ? userInput : null}
                    />
                </WaldiezProvider>
            </ReactFlowProvider>
        </HotkeysProvider>,
    );
};

let isDarkMode = false;
vi.spyOn(theme, "isDarkMode");
vi.spyOn(theme, "setDarkMode");
vi.mock("@waldiez/theme", async importOriginal => {
    const actual = await importOriginal();
    return {
        ...(actual as any),
        isDarkMode: (_flowId: string, _storageId: string) => {
            return isDarkMode;
        },
        setDarkMode: vi.fn(),
    };
});

beforeEach(() => {
    isDarkMode = !isDarkMode;
});

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
        await userEvent.click(screen.getByTestId(`export-flow-${flowId}-sidebar-button`));
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
        fireEvent.click(screen.getByTestId("theme-toggle"));
        expect(theme.setDarkMode).toBeCalledTimes(1);
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
