import { onChange, renderFlow } from "./common";
import { edgesCount } from "./data";
import { act, fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("WaldiezFlow Nodes and Edges", () => {
    it("should add a model node", () => {
        renderFlow();
        expect(screen.queryByTestId("model-0")).toBeNull();
        fireEvent.click(screen.getByTestId("show-models"));
        fireEvent.click(screen.getByTestId("add-model-node"));
    });
    it("should add a skill node", () => {
        renderFlow();
        expect(screen.queryByTestId("skill-0")).toBeNull();
        fireEvent.click(screen.getByTestId("show-skills"));
        fireEvent.click(screen.getByTestId("add-skill-node"));
    });
    it("should detach an agent node from its parent", async () => {
        act(() => {
            renderFlow();
        });
        vi.advanceTimersByTime(500);
        const groupMemberId = `group-member-agent-${edgesCount + 1}`;
        expect(screen.getByTestId(groupMemberId)).toBeTruthy();
        const removeButton = screen.queryByTitle("Remove member"); // svg title
        expect(removeButton).toBeTruthy();
        fireEvent.click(removeButton as HTMLElement);
        vi.advanceTimersByTime(500);
        expect(screen.queryByTestId(groupMemberId)).toBeNull();
    });
    it("should open edge edit modal on double click", async () => {
        act(() => {
            renderFlow();
        });
        const firstEdge = screen.getByTestId("rf__edge-edge-0");
        fireEvent.doubleClick(firstEdge);
        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    });
    it("should call on edgesChange when edge is un-selected", async () => {
        act(() => {
            renderFlow();
        });
        fireEvent.click(screen.getByTestId("rf__edge-edge-0"));
        fireEvent.click(screen.getByTestId("rf__edge-edge-1"));
        expect(onChange).toHaveBeenCalled();
    });
    it("should display the agent's linked models", async () => {
        act(() => {
            renderFlow({
                withLinkedModels: true,
            });
        });
        const linkedModelNameView = screen.getByTestId("agent-agent-0-linked-model-0");
        expect(linkedModelNameView.textContent).toBe("Model Node 0");
    });
    it("should display the agents' linked skills", async () => {
        act(() => {
            renderFlow({
                withLinkedSkills: true,
            });
        });
        const linkedSkillNameView = screen.getByTestId("agent-agent-0-linked-skill-0");
        expect(linkedSkillNameView.textContent).toBe("Skill Node 0");
    });
    it("should display the agents' linked models and skills", async () => {
        act(() => {
            renderFlow({
                withLinkedModels: true,
                withLinkedSkills: true,
            });
        });
        const linkedModelNameView = screen.getByTestId("agent-agent-0-linked-model-0");
        expect(linkedModelNameView.textContent).toBe("Model Node 0");
        const linkedSkillNameView = screen.getByTestId("agent-agent-0-linked-skill-0");
        expect(linkedSkillNameView.textContent).toBe("Skill Node 0");
    });
    it("should update an agent's description", async () => {
        act(() => {
            renderFlow();
        });
        const description = screen.getByTestId("agent-description-agent-0");
        fireEvent.change(description, {
            target: {
                value: "Updated Description",
            },
        });
        const descriptionUpdated = screen.getByTestId("agent-description-agent-0") as HTMLTextAreaElement;
        expect(descriptionUpdated.value).toBe("Updated Description");
    });
    it("should connect two agents with an edge", async () => {
        act(() => {
            renderFlow();
        });
        const sourceHandle = screen.getByTestId("agent-handle-left-source-agent-0");
        const targetHandle = screen.getByTestId("agent-handle-right-target-agent-3");
        expect(sourceHandle).toBeTruthy();
        expect(targetHandle).toBeTruthy();
        fireEvent.click(sourceHandle);
        fireEvent.click(targetHandle);
        vi.advanceTimersByTime(500);
    });
});
