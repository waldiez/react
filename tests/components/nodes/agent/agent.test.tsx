import { renderAgent, submitAgentChanges } from "./common";
import { agentId, flowId, getAgentData } from "./data";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

describe("WaldiezAgentNode", () => {
    it("should render", () => {
        renderAgent("user");
    });
    it("should open a user's modal", () => {
        renderAgent("user");
        const editButton = screen.getByTestId(`open-agent-node-modal-${agentId}`);
        expect(editButton).toBeInTheDocument();
        fireEvent.click(editButton);
        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    });
    it("should not open a user's modal if it's already open", () => {
        renderAgent("user", { openModal: true });
        const editButton = screen.getByTestId(`open-agent-node-modal-${agentId}`);
        expect(editButton).toBeInTheDocument();
        fireEvent.click(editButton);
        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
        (HTMLDialogElement.prototype.showModal as jest.Mock).mockClear();
        fireEvent.click(editButton);
        expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
    });
    it("should open an assistant's modal", () => {
        renderAgent("assistant");
        const editButton = screen.getByTestId(`open-agent-node-modal-${agentId}`);
        expect(editButton).toBeInTheDocument();
        fireEvent.click(editButton);
        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    });
    it("should open a manager's modal", () => {
        renderAgent("manager");
        const editButton = screen.getByTestId(`open-agent-node-modal-${agentId}`);
        expect(editButton).toBeInTheDocument();
        fireEvent.click(editButton);
        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    });
    it("should open a rag user's modal", () => {
        renderAgent("rag_user");
        const editButton = screen.getByTestId(`open-agent-node-modal-${agentId}`);
        expect(editButton).toBeInTheDocument();
        fireEvent.click(editButton);
        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    });
    it("should import a user agent", async () => {
        renderAgent("assistant", { openModal: true });
        const labelViewInput = screen.getByTestId(`agent-name-input-${agentId}`);
        expect(labelViewInput).toHaveValue("Assistant");
        const agentData = getAgentData("user");
        const importInput = screen.getByTestId(`file-upload-agent-${flowId}-${agentId}`);
        const importData = {
            id: agentId,
            type: "agent",
            agentType: "user",
            data: { ...(agentData as any) },
        };
        await userEvent.upload(importInput, [new File([JSON.stringify(importData)], "test.waldiezAgent")]);
        await waitFor(() => {
            expect(labelViewInput).toHaveValue("User");
        });
        submitAgentChanges();
    });
    it("should import an assistant agent", async () => {
        renderAgent("user", { openModal: true });
        const labelViewInput = screen.getByTestId(`agent-name-input-${agentId}`);
        expect(labelViewInput).toHaveValue("User");
        const agentData = getAgentData("assistant");
        const importInput = screen.getByTestId(`file-upload-agent-${flowId}-${agentId}`);
        const importData = {
            id: agentId,
            type: "agent",
            agentType: "assistant",
            data: { ...(agentData as any) },
        };
        await userEvent.upload(importInput, [new File([JSON.stringify(importData)], "test.waldiezAgent")]);
        await waitFor(() => {
            expect(labelViewInput).toHaveValue("Assistant");
        });
        submitAgentChanges();
    });
    it("should import a manager agent", async () => {
        renderAgent("assistant", { openModal: true });
        const labelViewInput = screen.getByTestId(`agent-name-input-${agentId}`);
        expect(labelViewInput).toHaveValue("Assistant");
        const agentData = getAgentData("manager");
        const importInput = screen.getByTestId(`file-upload-agent-${flowId}-${agentId}`);
        const importData = {
            id: agentId,
            type: "agent",
            agentType: "manager",
            data: { ...(agentData as any) },
        };
        await userEvent.upload(importInput, [new File([JSON.stringify(importData)], "test.waldiezAgent")]);
        await waitFor(() => {
            expect(labelViewInput).toHaveValue("Manager");
        });
        submitAgentChanges();
    });

    it("should import a rag user agent", async () => {
        renderAgent("user", { openModal: true });
        const labelViewInput = screen.getByTestId(`agent-name-input-${agentId}`);
        expect(labelViewInput).toHaveValue("User");
        const agentData = getAgentData("rag_user");
        const importInput = screen.getByTestId(`file-upload-agent-${flowId}-${agentId}`);
        const importData = {
            id: agentId,
            type: "agent",
            agentType: "rag_user",
            data: { ...(agentData as any) },
        };
        await userEvent.upload(importInput, [new File([JSON.stringify(importData)], "test.waldiezAgent")]);
        await waitFor(() => {
            expect(labelViewInput).toHaveValue("RAG User");
        });
        submitAgentChanges();
    });
    it("should export a user agent", () => {
        renderAgent("user", {
            openModal: true,
            dataOverrides: {
                nestedChats: [
                    {
                        triggeredBy: [{ id: "test", isReply: false }],
                        messages: [{ id: "test", isReply: true }],
                    },
                ],
            },
        });
        const exportButton = screen.getByTestId(`export-agent-${flowId}-${agentId}`);
        fireEvent.click(exportButton);
        expect(window.URL.createObjectURL).toHaveBeenCalled();
        expect(window.URL.revokeObjectURL).toHaveBeenCalled();
        expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
    });
    it("should export a rag user agent", () => {
        renderAgent("rag_user", {
            openModal: true,
            dataOverrides: {
                nestedChats: [
                    {
                        triggeredBy: [{ id: "test", isReply: false }],
                        messages: [{ id: "test", isReply: true }],
                    },
                ],
            },
        });
        const exportButton = screen.getByTestId(`export-agent-${flowId}-${agentId}`);
        fireEvent.click(exportButton);
        expect(window.URL.createObjectURL).toHaveBeenCalled();
        expect(window.URL.revokeObjectURL).toHaveBeenCalled();
        expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
    });
    it("should export an assistant agent", () => {
        renderAgent("assistant", {
            openModal: true,
            dataOverrides: {
                codeExecutionConfig: {
                    workDir: undefined,
                    useDocker: false,
                    timeout: 10,
                    lastNMessages: "auto",
                    functions: ["skill1", "skill2"],
                },
            },
        });
        const exportButton = screen.getByTestId(`export-agent-${flowId}-${agentId}`);
        fireEvent.click(exportButton);
        expect(window.URL.createObjectURL).toHaveBeenCalled();
        expect(window.URL.revokeObjectURL).toHaveBeenCalled();
        expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
    });
    it("should export a manager agent", () => {
        renderAgent("manager", {
            openModal: true,
            dataOverrides: {
                codeExecutionConfig: {
                    workDir: undefined,
                    useDocker: false,
                    timeout: 10,
                    lastNMessages: "auto",
                    functions: [],
                },
            },
        });
        const exportButton = screen.getByTestId(`export-agent-${flowId}-${agentId}`);
        fireEvent.click(exportButton);
        expect(window.URL.createObjectURL).toHaveBeenCalled();
        expect(window.URL.revokeObjectURL).toHaveBeenCalled();
        expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
    });
});
