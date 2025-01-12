import { assistantDataTransfer, managerDataTransfer, renderFlow, userDataTransfer } from "./common";
import { edgesCount, flowId } from "./data";
import { act, fireEvent, screen } from "@testing-library/react";
import { describe, it } from "vitest";

describe("Flow DnD", () => {
    it("should add a user agent node on drag and drop", async () => {
        act(() => {
            renderFlow();
        });
        const sourceElement = screen.getByTestId("user-dnd");
        const targetElement = screen.getByTestId(`drop-area-${flowId}`);
        fireEvent.mouseDown(sourceElement);
        fireEvent.dragStart(sourceElement, {
            dataTransfer: userDataTransfer,
        });
        fireEvent.dragOver(targetElement, {
            dataTransfer: userDataTransfer,
        });
        fireEvent.drop(targetElement, {
            dataTransfer: userDataTransfer,
        });
        fireEvent.mouseUp(targetElement);
    });
    it("should add an assistant agent node on drag and drop", async () => {
        act(() => {
            renderFlow();
        });
        const sourceElement = screen.getByTestId("assistant-dnd");
        const targetElement = screen.getByTestId(`drop-area-${flowId}`);
        fireEvent.mouseDown(sourceElement);
        fireEvent.dragStart(sourceElement, {
            dataTransfer: assistantDataTransfer,
        });
        fireEvent.dragOver(targetElement, {
            dataTransfer: assistantDataTransfer,
        });
        fireEvent.drop(targetElement, {
            dataTransfer: assistantDataTransfer,
        });
        fireEvent.mouseUp(targetElement);
    });
    it("should add a manager agent node on drag and drop", async () => {
        act(() => {
            renderFlow();
        });
        const sourceElement = screen.getByTestId("manager-dnd");
        const targetElement = screen.getByTestId(`drop-area-${flowId}`);
        fireEvent.mouseDown(sourceElement);
        fireEvent.dragStart(sourceElement, {
            dataTransfer: managerDataTransfer,
        });
        fireEvent.dragOver(targetElement, {
            dataTransfer: managerDataTransfer,
        });
        fireEvent.drop(targetElement, {
            dataTransfer: managerDataTransfer,
        });
        fireEvent.mouseUp(targetElement);
    });
    it("should drop an agent node on a manager agent node", async () => {
        // this gives: Cannot read properties of undefined (reading 'parentId')
        // and event.clientX: Nan, event.clientY: Nan :(
        act(() => {
            renderFlow();
        });
        vi.advanceTimersByTime(500);
        const sourceElement = screen.getByTestId("user-dnd");
        const targetElement = screen.getByTestId(`rf__node-agent-${edgesCount}`);
        fireEvent.mouseDown(sourceElement);
        fireEvent.dragStart(sourceElement, {
            dataTransfer: managerDataTransfer,
        });
        fireEvent.dragOver(targetElement, {
            dataTransfer: managerDataTransfer,
        });
        fireEvent.drop(targetElement, {
            dataTransfer: managerDataTransfer,
        });
        fireEvent.mouseUp(targetElement);
    });
});
