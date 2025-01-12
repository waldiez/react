import { KeyboardEvent } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { useTemporalStore, useWaldiezContext } from "@waldiez/store";
import { getFlowRoot } from "@waldiez/utils";

export const useKeys = (flowId: string, onSave?: ((flow: string) => void) | null) => {
    const { undo, redo, futureStates, pastStates } = useTemporalStore(state => state);
    const deleteAgent = useWaldiezContext(selector => selector.deleteAgent);
    const deleteEdge = useWaldiezContext(selector => selector.deleteEdge);
    const deleteModel = useWaldiezContext(selector => selector.deleteModel);
    const deleteSkill = useWaldiezContext(selector => selector.deleteSkill);
    const saveFlow = useWaldiezContext(selector => selector.saveFlow);
    const listenForSave = typeof onSave === "function";
    const isFlowVisible = () => {
        // if on jupyter, we might have more than one tabs with a flow
        // let's check if the current flow is visible (i.e. we are in the right tab)
        const rootDiv = getFlowRoot(flowId);
        if (!rootDiv) {
            return false;
        }
        const clientRect = rootDiv.getBoundingClientRect();
        return clientRect.width > 0 && clientRect.height > 0;
    };
    useHotkeys(
        "mod+z",
        () => {
            if (pastStates.length > 0) {
                if (isFlowVisible()) {
                    undo();
                }
            }
        },
        { scopes: flowId },
    );
    useHotkeys(
        ["shift+mod+z", "mod+y"],
        () => {
            if (futureStates.length > 0) {
                if (isFlowVisible()) {
                    redo();
                }
            }
        },
        { scopes: flowId },
    );
    if (listenForSave) {
        useHotkeys(
            "mod+s",
            event => {
                if (isFlowVisible()) {
                    event.preventDefault();
                    saveFlow();
                }
            },
            { scopes: flowId },
        );
    }
    const onDeleteKey = (event: KeyboardEvent) => {
        const target = event.target;
        const isNode = target instanceof Element && target.classList.contains("react-flow__node");
        if (isNode) {
            deleteNode(target);
        } else {
            const isEdge =
                target instanceof Element &&
                (target.classList.contains("react-flow__edge") ||
                    target.classList.contains("edge-data-view"));
            if (isEdge) {
                onDeleteEdge(target);
            }
        }
    };
    const onKeyDown = (event: KeyboardEvent | undefined) => {
        if (event?.key === "Delete") {
            if (isFlowVisible()) {
                onDeleteKey(event);
            }
        }
    };
    const deleteNode = (target: Element) => {
        const nodeId = target.getAttribute("data-id");
        if (nodeId) {
            const isAgent = target.classList.contains("react-flow__node-agent");
            const isModel = target.classList.contains("react-flow__node-model");
            const isSkill = target.classList.contains("react-flow__node-skill");
            if (isAgent) {
                deleteAgent(nodeId);
            } else {
                if (isModel) {
                    deleteModel(nodeId);
                } else {
                    if (isSkill) {
                        deleteSkill(nodeId);
                    }
                }
            }
        }
    };
    const onDeleteEdge = (target: Element) => {
        const edgeId = target.getAttribute("data-id");
        if (edgeId) {
            deleteEdge(edgeId);
        }
    };
    return { onKeyDown };
};
