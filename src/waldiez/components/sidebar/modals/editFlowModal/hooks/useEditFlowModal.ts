import { useEffect, useState } from "react";

import { SingleValue } from "@waldiez/components/inputs";
import {
    EditFlowModalData,
    EditFlowModalProps,
} from "@waldiez/components/sidebar/modals/editFlowModal/types";
import { WaldiezEdge } from "@waldiez/models";
import { useWaldiezContext } from "@waldiez/store";

export const useEditFlowModal = (props: EditFlowModalProps) => {
    const { isOpen, onClose } = props;
    const getFlowInfo = useWaldiezContext(selector => selector.getFlowInfo);
    const flowInfo = getFlowInfo();
    const { name, description, requirements, tags } = flowInfo;
    const [flowData, setFlowData] = useState<EditFlowModalData>({
        name,
        description,
        requirements,
        tags,
    });
    const [selectedNewEdge, setSelectedNewEdge] = useState<WaldiezEdge | null>(null);
    const getFlowEdges = useWaldiezContext(selector => selector.getFlowEdges);
    const [sortedEdges, remainingEdges] = getFlowEdges();
    const updateFlow = useWaldiezContext(selector => selector.updateFlow);
    const updateFlowOrder = useWaldiezContext(selector => selector.updateFlowOrder);
    const onFlowChanged = useWaldiezContext(selector => selector.onFlowChanged);
    // tmp state (to save onSubmit, discard onCancel)
    const [sortedEdgesState, setSortedEdgesState] = useState<WaldiezEdge[]>(sortedEdges);
    const [remainingEdgesState, setRemainingEdgeState] = useState<WaldiezEdge[]>(remainingEdges);
    const isDataDirty =
        JSON.stringify(flowData) !== JSON.stringify({ name, description, requirements, tags });
    const isEdgesDirty = JSON.stringify(sortedEdgesState) !== JSON.stringify(sortedEdges);
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
        updateFlow(flowData);
        updateFlowOrder(edgeOrders);
        onFlowChanged();
        setIsDirty(false);
    };
    const reset = () => {
        const { name, description, requirements, tags } = getFlowInfo();
        setFlowData({ name, description, requirements, tags });
        const [storedSortedEdges, storedRemainingEdges] = getFlowEdges();
        setSortedEdgesState(storedSortedEdges);
        setRemainingEdgeState(storedRemainingEdges);
        setIsDirty(false);
    };
    const onCancel = () => {
        reset();
        onClose();
    };
    const onDataChange = (partialData: Partial<EditFlowModalData>) => {
        setFlowData({ ...flowData, ...partialData });
        const isDataDirty =
            JSON.stringify({ ...flowData, ...partialData }) !==
            JSON.stringify({ name, description, requirements, tags });
        const isEdgesDirty = JSON.stringify(sortedEdgesState) !== JSON.stringify(sortedEdges);
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
        if (!remainingEdgesState.find(e => e.id === selectedNewEdge.id)) {
            return;
        }
        const lastOrder = getNewEdgeOrder();
        const newSelectedEdge = {
            ...selectedNewEdge,
            data: { ...selectedNewEdge.data, order: lastOrder } as any,
        };
        setSortedEdgesState([...sortedEdgesState, newSelectedEdge]);
        setRemainingEdgeState(remainingEdgesState.filter(e => e.id !== selectedNewEdge.id));
        setSelectedNewEdge(null);
        setIsDirty(true);
    };
    const onRemoveEdge = (edge: WaldiezEdge) => {
        // avoid having zero edges/chats in the flow
        if (sortedEdgesState.length === 1) {
            return;
        }
        // it should be in the 'sorted' list
        if (!sortedEdgesState.find(e => e.id === edge.id)) {
            return;
        }
        // set the order to -1
        // edge.data = { ...edge.data, order: -1 } as any;
        setSortedEdgesState(sortedEdgesState.filter(e => e.id !== edge.id));
        setRemainingEdgeState([
            ...remainingEdgesState,
            { ...edge, data: { ...edge.data, order: -1 } as any },
        ]);
        setIsDirty(true);
    };
    const onMoveEdgeUp = (index: number) => {
        // it should be in the 'sorted' list
        if (!sortedEdgesState.find(e => e.id === sortedEdgesState[index].id)) {
            return;
        }
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
    };
    const onMoveEdgeDown = (index: number) => {
        // it should be in the 'sorted' list
        if (!sortedEdgesState.find(e => e.id === sortedEdgesState[index].id)) {
            return;
        }
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
