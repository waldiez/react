import { onChange, renderFlow } from "./common";
import { edgesCount } from "./data";
import { act, fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("WaldiezFlow Delete Nodes", () => {
    it("should delete an agent node", async () => {
        act(() => {
            renderFlow();
        });
        const agentFooter = screen.getByTestId("agent-footer-agent-0");
        expect(agentFooter).toBeTruthy();
        const deleteDiv = agentFooter.querySelector(".delete-agent");
        expect(deleteDiv).toBeTruthy();
        fireEvent.click(deleteDiv as HTMLElement);
        expect(onChange).toHaveBeenCalled();
    });
    it("should delete a group manager node", async () => {
        act(() => {
            renderFlow();
        });
        const groupManagerFooter = screen.getByTestId(`agent-footer-agent-${edgesCount}`);
        expect(groupManagerFooter).toBeTruthy();
        const deleteDiv = groupManagerFooter.querySelector(".delete-agent");
        expect(deleteDiv).toBeTruthy();
        fireEvent.click(deleteDiv as HTMLElement);
        expect(onChange).toHaveBeenCalled();
    });
    it("should delete a model node", async () => {
        act(() => {
            renderFlow();
        });
        fireEvent.click(screen.getByTestId("show-models"));
        fireEvent.click(screen.getByTestId("add-model-node"));
        const modelFooter = screen.getByTestId("model-footer-model-0");
        expect(modelFooter).toBeTruthy();
        const deleteDiv = screen.getByTestId("delete-node-model-0");
        expect(deleteDiv).toBeTruthy();
        fireEvent.click(deleteDiv as HTMLElement);
        expect(onChange).toHaveBeenCalled();
    });
    it("should delete a skill node", async () => {
        act(() => {
            renderFlow();
        });
        fireEvent.click(screen.getByTestId("show-skills"));
        fireEvent.click(screen.getByTestId("add-skill-node"));
        const skillFooter = screen.getByTestId("skill-footer-skill-0");
        expect(skillFooter).toBeTruthy();
        const deleteDiv = screen.getByTestId("delete-node-skill-0");
        expect(deleteDiv).toBeTruthy();
        fireEvent.click(deleteDiv as HTMLElement);
        expect(onChange).toHaveBeenCalled();
    });
});
