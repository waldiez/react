/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import {
    assistantDataTransfer,
    managerDataTransfer,
    reasoningDataTransfer,
    renderFlow,
    swarmDataTransfer,
    userDataTransfer,
} from "./common";
import { edgesCount, flowId } from "./data";
import { act, fireEvent, screen } from "@testing-library/react";
import { describe, it } from "vitest";

describe("Flow DnD", () => {
    it("should add a user agent node on drag and drop", async () => {
        act(() => {
            renderFlow();
        });
        const toggleAgentsView = screen.getByTestId("show-agents");
        fireEvent.click(toggleAgentsView);
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
        const toggleAgentsView = screen.getByTestId("show-agents");
        fireEvent.click(toggleAgentsView);
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
        const toggleAgentsView = screen.getByTestId("show-agents");
        fireEvent.click(toggleAgentsView);
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
        const toggleAgentsView = screen.getByTestId("show-agents");
        fireEvent.click(toggleAgentsView);
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
    it("should add a swarm agent node on drag and drop", async () => {
        act(() => {
            renderFlow();
        });
        const toggleAgentsView = screen.getByTestId("show-agents");
        fireEvent.click(toggleAgentsView);
        const sourceElement = screen.getByTestId("swarm-dnd");
        const targetElement = screen.getByTestId(`drop-area-${flowId}`);
        fireEvent.mouseDown(sourceElement);
        fireEvent.dragStart(sourceElement, {
            dataTransfer: swarmDataTransfer,
        });
        fireEvent.dragOver(targetElement, {
            dataTransfer: swarmDataTransfer,
        });
        fireEvent.drop(targetElement, {
            dataTransfer: swarmDataTransfer,
        });
        fireEvent.mouseUp(targetElement);
    });
    it("should add a reasoning agent node on drag and drop", async () => {
        act(() => {
            renderFlow();
        });
        const toggleAgentsView = screen.getByTestId("show-agents");
        fireEvent.click(toggleAgentsView);
        const sourceElement = screen.getByTestId("reasoning-dnd");
        const targetElement = screen.getByTestId(`drop-area-${flowId}`);
        fireEvent.mouseDown(sourceElement);
        fireEvent.dragStart(sourceElement, {
            dataTransfer: reasoningDataTransfer,
        });
        fireEvent.dragOver(targetElement, {
            dataTransfer: reasoningDataTransfer,
        });
        fireEvent.drop(targetElement, {
            dataTransfer: reasoningDataTransfer,
        });
        fireEvent.mouseUp(targetElement);
    });
});
