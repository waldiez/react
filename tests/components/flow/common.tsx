import { createdAt, edges, flowId, nodes, updatedAt } from "./data";
import { render } from "@testing-library/react";

import { ReactFlowProvider } from "@xyflow/react";

import { HotkeysProvider } from "react-hotkeys-hook";

import { WaldiezFlow } from "@waldiez/components/flow";
import { WaldiezProvider } from "@waldiez/store";

export const onRun = vi.fn();
export const onChange = vi.fn();
export const onUserInput = vi.fn();
export const onConvert = vi.fn();
export const onSave = vi.fn();

export const assistantDataTransfer = {
    setData: vi.fn(),
    getData: (key: string) => {
        if (key === "application/node") {
            return "agent";
        }
        return "assistant";
    },
};
export const userDataTransfer = {
    setData: vi.fn(),
    getData: (key: string) => {
        if (key === "application/node") {
            return "agent";
        }
        return "user";
    },
};

export const managerDataTransfer = {
    setData: vi.fn(),
    getData: (key: string) => {
        if (key === "application/node") {
            return "agent";
        }
        return "manager";
    },
};

export const renderFlow = (
    options: {
        withLinkedModels?: boolean;
        withLinkedSkills?: boolean;
    } = {
        withLinkedModels: false,
        withLinkedSkills: false,
    },
) => {
    const { withLinkedModels, withLinkedSkills } = options;
    let nodesToUse = [...nodes];
    if (withLinkedModels) {
        nodesToUse = nodes.map(node => {
            if (node.type !== "agent") {
                return node;
            }
            if (withLinkedSkills) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        modelIds: ["model-0"],
                        skills: [{ id: "skill-0", executorId: "agent-0" }],
                    },
                };
            }
            return {
                ...node,
                data: {
                    ...node.data,
                    modelIds: ["model-0"],
                },
            };
        });
    }
    if (withLinkedSkills) {
        nodesToUse = nodes.map(node => {
            if (node.type !== "agent") {
                return node;
            }
            if (withLinkedModels) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        modelIds: ["model-0"],
                        skills: [{ id: "skill-0", executorId: "agent-0" }],
                    },
                };
            }
            return {
                ...node,
                data: {
                    ...node.data,
                    skills: [{ id: "skill-0", executorId: "agent-0" }],
                },
            };
        });
    }
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
                    edges={edges}
                    viewport={{ zoom: 1, x: 50, y: 50 }}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                    onChange={onChange}
                    onSave={onSave}
                >
                    <WaldiezFlow
                        flowId={flowId}
                        storageId={flowId}
                        onChange={onChange}
                        onRun={onRun}
                        onUserInput={onUserInput}
                        inputPrompt={null}
                        onConvert={onConvert}
                        onSave={onSave}
                    />
                </WaldiezProvider>
            </ReactFlowProvider>
        </HotkeysProvider>,
    );
};
