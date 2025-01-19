import { renderEdge } from "../common";
import { edgeProps, flowId } from "../data";
import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import selectEvent from "react-select-event";

describe("WaldiezEdgeSwarmTabs Trigger", () => {
    it("renders the trigger tab", () => {
        renderEdge("swarm");
        const tab = screen.getByTestId(`tab-id-we-${flowId}-edge-properties-${edgeProps.id}`);
        expect(tab).toBeInTheDocument();
    });
    it("updates the label", () => {
        renderEdge("swarm");
        const labelInput = screen.getByTestId(`edge-${edgeProps.id}-label-input`) as HTMLInputElement;
        fireEvent.change(labelInput, { target: { value: "Updated label" } });
        expect(labelInput.value).toBe("Updated label");
    });
    it("updates the message", () => {
        renderEdge("swarm");
        const messageInput = screen.getByTestId(
            `edge-${edgeProps.id}-condition-input`,
        ) as HTMLTextAreaElement;
        fireEvent.change(messageInput, { target: { value: "Updated message" } });
        expect(messageInput.value).toBe("Updated message");
    });
});

describe("WaldiezEdgeSwarmTabs Handoff", () => {
    it("renders the handoff tab", () => {
        renderEdge("swarm", {}, true, "handoff");
        const tab = screen.getByTestId(`tab-id-we-${flowId}-edge-handoff-${edgeProps.id}`);
        expect(tab).toBeInTheDocument();
    });
    it("updates the label", () => {
        renderEdge("swarm", {}, true, "handoff");
        const labelInput = screen.getByTestId(`edge-${edgeProps.id}-description-input`) as HTMLInputElement;
        fireEvent.change(labelInput, { target: { value: "Updated label" } });
        expect(labelInput.value).toBe("Updated label");
    });
    it("updates the condition", () => {
        renderEdge("swarm", {}, true, "handoff");
        const conditionInput = screen.getByTestId(
            `edge-${edgeProps.id}-condition-input`,
        ) as HTMLTextAreaElement;
        fireEvent.change(conditionInput, { target: { value: "Updated condition" } });
        expect(conditionInput.value).toBe("Updated condition");
    });
    it("updates the handoff type", async () => {
        renderEdge("swarm", {}, true, "handoff");
        const tab = screen.getByTestId(`tab-id-we-${flowId}-edge-handoff-${edgeProps.id}`);
        fireEvent.click(tab);
        const handoffTypeSelect = screen.getByLabelText("Handoff Type:");
        expect(handoffTypeSelect).toBeInTheDocument();
        selectEvent.openMenu(handoffTypeSelect);
        await selectEvent.select(handoffTypeSelect, "After work");
        fireEvent.change(handoffTypeSelect, {
            label: "After work",
            target: { value: "after_work" },
        });
    });
    it("updates the availability", () => {
        renderEdge("swarm", {}, true, "handoff");
        const tab = screen.getByTestId(`tab-id-we-${flowId}-edge-handoff-${edgeProps.id}`);
        fireEvent.click(tab);
        const availableTab = screen.getByTestId(`tab-id-we-${flowId}-edge-availability-${edgeProps.id}`);
        fireEvent.click(availableTab);
        const checkbox = screen.getByTestId("onConditionAvailable") as HTMLInputElement;
        fireEvent.click(checkbox);
        const availableInput = screen.getByTestId("onConditionAvailableVariableInput") as HTMLInputElement;
        fireEvent.change(availableInput, { target: { value: "Updated available" } });
        expect(availableInput.value).toBe("Updated available");
    });
});
describe("WaldiezEdgeSwarmTabs Nested", () => {
    it("renders the nested tab", () => {
        renderEdge("swarm", {}, true, "nested");
        const tab = screen.getByTestId(`tab-id-we-${flowId}-edge-properties-${edgeProps.id}`);
        expect(tab).toBeInTheDocument();
    });
    it("updates the label", () => {
        renderEdge("swarm", { nestedChat: null }, true, "nested");
        const labelInput = screen.getByTestId(`edge-${edgeProps.id}-label-input`) as HTMLInputElement;
        fireEvent.change(labelInput, { target: { value: "Updated label" } });
        expect(labelInput.value).toBe("Updated label");
    });
    it("updates the message type", () => {
        renderEdge(
            "swarm",
            {
                nestedChat: {
                    message: {
                        type: "string",
                        content: "Initial message content",
                    },
                },
            },
            true,
            "nested",
        );
        const tab = screen.getByTestId(`tab-id-we-${flowId}-edge-nested-chat-${edgeProps.id}-message`);
        fireEvent.click(tab);
        const messageTypeSelect = screen.getByLabelText("Message Type:");
        expect(messageTypeSelect).toBeInTheDocument();
        selectEvent.openMenu(messageTypeSelect);
        selectEvent.select(messageTypeSelect, "Custom method");
        fireEvent.change(messageTypeSelect, {
            label: "Custom method",
            target: { value: "method" },
        });
    });
    it("updates the message content", () => {
        renderEdge(
            "swarm",
            {
                nestedChat: {
                    message: {
                        type: "string",
                        content: "Initial message content",
                    },
                },
            },
            true,
            "nested",
        );
        const tab = screen.getByTestId(`tab-id-we-${flowId}-edge-nested-chat-${edgeProps.id}-message`);
        fireEvent.click(tab);
        const messageContentInput = screen.getByTestId("message-text") as HTMLTextAreaElement;
        fireEvent.change(messageContentInput, {
            target: { value: "Updated message content" },
        });
        expect(messageContentInput.value).toBe("Updated message content");
        // it("updates the message type", async () => {
        //     renderEdge("chat");
        //     const tab = screen.getByTestId(`tab-id-we-${flowId}-edge-message-${edgeProps.id}`);
        //     fireEvent.click(tab);
        //     const messageTypeSelect = screen.getByLabelText("Message Type:");
        //     expect(messageTypeSelect).toBeInTheDocument();
        //     selectEvent.openMenu(messageTypeSelect);
        //     await selectEvent.select(messageTypeSelect, "None");
        //     fireEvent.change(messageTypeSelect, {
        //         label: "None",
        //         target: { value: "none" },
        //     });
        // });
        // it("updates the message content", async () => {
        //     renderEdge("chat");
        //     const tab = screen.getByTestId(`tab-id-we-${flowId}-edge-message-${edgeProps.id}`);
        //     fireEvent.click(tab);
        //     const messageContentInput = screen.getByTestId("message-text") as HTMLTextAreaElement;
        //     fireEvent.change(messageContentInput, {
        //         target: { value: "Updated message content" },
        //     });
        //     expect(messageContentInput.value).toBe("Updated message content");
        // });
    });
});
/*
{isNested && (
                <TabItems activeTabIndex={0}>
                    <TabItem label="Properties" id={`we-${flowId}-edge-properties-${edgeId}`}>
                        <div className="flex-column margin-bottom-10">
                            <TextInput
                                label="Label:"
                                value={edgeData.label}
                                onChange={onLabelChange}
                                dataTestId={`edge-${edgeId}-label-input`}
                            />
                        </div>
                        <WaldiezEdgeBasicTab
                            edgeId={edgeId}
                            data={edgeData}
                            edgeType="swarm"
                            onDataChange={onDataChange}
                            onTypeChange={noOp}
                        />
                    </TabItem>
                    <TabItem label="Message" id={`we-${flowId}-edge-nested-chat-${edgeId}-message`}>
                        <div className="flex-column">
                            <MessageInput
                                darkMode={darkMode}
                                current={currentMessageInput}
                                selectLabel="Message Type:"
                                selectTestId={`select-nested-message-type-${edgeId}`}
                                defaultContent={DEFAULT_NESTED_CHAT_MESSAGE_METHOD_CONTENT}
                                notNoneLabel="Message:"
                                notNoneLabelInfo="The message to be sent from the source."
                                includeContext={false}
                                skipCarryoverOption={true}
                                skipRagOption={true}
                                skipNone={true}
                                onTypeChange={onNestedMessageTypeChange}
                                onMessageChange={onNestedMessageChange}
                                onAddContextEntry={noOp}
                                onRemoveContextEntry={noOp}
                                onUpdateContextEntries={noOp}
                            />
                        </div>
                    </TabItem>
                </TabItems>
            )}
// swarmType: "handoff" | "nested" | "source"
*/
