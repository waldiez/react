import { useEffect, useState } from "react";
import isEqual from "react-fast-compare";

import { SingleValue } from "@waldiez/components";
import {
    EditFlowModalData,
    EditFlowModalProps,
} from "@waldiez/containers/sidebar/modals/editFlowModal/types";
import { WaldiezEdge } from "@waldiez/models";
import { useWaldiez } from "@waldiez/store";

export const useEditFlowModal = (props: EditFlowModalProps) => {
    const { isOpen, onClose } = props;
    const getFlowInfo = useWaldiez(s => s.getFlowInfo);
    const updateFlowInfo = useWaldiez(s => s.updateFlowInfo);
    const updateFlowOrder = useWaldiez(s => s.updateFlowOrder);
    const flowInfo = getFlowInfo();
    const { name, description, requirements, tags, isAsync } = flowInfo;
    const [flowData, setFlowData] = useState<EditFlowModalData>({
        name,
        description,
        requirements,
        tags,
        isAsync,
    });
    const [selectedNewEdge, setSelectedNewEdge] = useState<WaldiezEdge | null>(null);
    const getFlowEdges = useWaldiez(s => s.getFlowEdges);
    const { used: sortedEdges, remaining: remainingEdges } = getFlowEdges(true);
    const onFlowChanged = useWaldiez(s => s.onFlowChanged);
    // tmp state (to save onSubmit, discard onCancel)
    const [sortedEdgesState, setSortedEdgesState] = useState<WaldiezEdge[]>(sortedEdges);
    const [remainingEdgesState, setRemainingEdgeState] = useState<WaldiezEdge[]>(remainingEdges);
    const isDataDirty = !isEqual(flowData, { name, description, requirements, tags });
    const isEdgesDirty = !isEqual(sortedEdgesState, sortedEdges);
    const [isDirty, setIsDirty] = useState<boolean>(isDataDirty || isEdgesDirty);
    useEffect(() => {
        reset();
    }, [isOpen]);
    const onSubmit = () => {
        const edgeOrders = sortedEdgesState
            .map((edge, index) => ({
                id: edge.id,
                order: index + 1,
            }))
            .concat(
                remainingEdgesState.map(edge => ({
                    id: edge.id,
                    order: -1,
                })),
            );
        updateFlowInfo(flowData);
        updateFlowOrder(edgeOrders);
        onFlowChanged();
        setIsDirty(false);
    };
    const reset = () => {
        const { name, description, requirements, tags, isAsync } = getFlowInfo();
        setFlowData({ name, description, requirements, tags, isAsync });
        const { used, remaining } = getFlowEdges(true);
        setSortedEdgesState(used);
        setRemainingEdgeState(remaining);
        setIsDirty(false);
    };
    const onCancel = () => {
        reset();
        onClose();
    };
    const onDataChange = (partialData: Partial<EditFlowModalData>) => {
        setFlowData({ ...flowData, ...partialData });
        const isDataDirty = !isEqual(
            { ...flowData, ...partialData },
            { name, description, requirements, tags },
        );
        const isEdgesDirty = !isEqual(sortedEdgesState, sortedEdges);
        setIsDirty(isDataDirty || isEdgesDirty);
    };
    const onSelectedNewEdgeChange = (option: SingleValue<{ label: string; value: WaldiezEdge }>) => {
        if (option) {
            setSelectedNewEdge(option.value);
        }
    };
    const getNewEdgeOrder = () => {
        // find the last order
        let lastOrder = sortedEdgesState[sortedEdgesState.length - 1]?.data?.order;
        if (lastOrder === undefined) {
            lastOrder = sortedEdgesState.length;
        } else {
            lastOrder++;
        }
        if (lastOrder < 0) {
            lastOrder = 0;
        }
        return lastOrder;
    };
    const onAddEdge = () => {
        if (!selectedNewEdge) {
            return;
        }
        // it should be in the 'remaining' list
        if (remainingEdgesState.find(e => e.id === selectedNewEdge.id)) {
            const lastOrder = getNewEdgeOrder();
            const newSelectedEdge = {
                ...selectedNewEdge,
                data: { ...selectedNewEdge.data, order: lastOrder } as any,
            };
            setSortedEdgesState([...sortedEdgesState, newSelectedEdge]);
            setRemainingEdgeState(remainingEdgesState.filter(e => e.id !== selectedNewEdge.id));
            setSelectedNewEdge(null);
            setIsDirty(true);
        }
    };
    const onRemoveEdge = (edge: WaldiezEdge) => {
        // avoid having zero edges/chats in the flow
        if (sortedEdgesState.length === 1) {
            return;
        }
        // it should be in the 'sorted' list
        if (sortedEdgesState.find(e => e.id === edge.id)) {
            // set the order to -1
            // edge.data = { ...edge.data, order: -1 } as any;
            setSortedEdgesState(sortedEdgesState.filter(e => e.id !== edge.id));
            setRemainingEdgeState([
                ...remainingEdgesState,
                { ...edge, data: { ...edge.data, order: -1 } as any },
            ]);
            setIsDirty(true);
        }
    };
    const onMoveEdgeUp = (index: number) => {
        // it should be in the 'sorted' list
        if (sortedEdgesState.find(e => e.id === sortedEdgesState[index].id)) {
            // swap the order between the current and the previous edge
            const previousEdge = sortedEdgesState[index - 1];
            const previousOrder = previousEdge.data?.order;
            const currentEdge = sortedEdgesState[index];
            const currentOrder = currentEdge.data?.order;
            const newSortedEdges = sortedEdgesState.slice();
            newSortedEdges[index - 1] = {
                ...currentEdge,
                data: { ...currentEdge.data, order: previousOrder },
            } as WaldiezEdge;
            newSortedEdges[index] = {
                ...previousEdge,
                data: { ...previousEdge.data, order: currentOrder },
            } as WaldiezEdge;
            setSortedEdgesState(newSortedEdges);
            setIsDirty(true);
        }
    };
    const onMoveEdgeDown = (index: number) => {
        // it should be in the 'sorted' list
        if (sortedEdgesState.find(e => e.id === sortedEdgesState[index].id)) {
            // swap the order between the current and the next edge
            const nextEdge = sortedEdgesState[index + 1];
            const nextOrder = nextEdge.data?.order;
            const currentEdge = sortedEdgesState[index];
            const currentOrder = currentEdge.data?.order;
            const newSortedEdges = sortedEdgesState.slice();
            newSortedEdges[index + 1] = {
                ...currentEdge,
                data: { ...currentEdge.data, order: nextOrder },
            } as WaldiezEdge;
            newSortedEdges[index] = {
                ...nextEdge,
                data: { ...nextEdge.data, order: currentOrder },
            } as WaldiezEdge;
            setSortedEdgesState(newSortedEdges);
            setIsDirty(true);
        }
    };
    return {
        flowData,
        isOpen,
        sortedEdgesState,
        remainingEdgesState,
        selectedNewEdge,
        isDirty,
        onClose,
        onSubmit,
        onCancel,
        onDataChange,
        onSelectedNewEdgeChange,
        onAddEdge,
        onRemoveEdge,
        onMoveEdgeUp,
        onMoveEdgeDown,
    };
};
