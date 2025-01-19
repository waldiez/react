import { EdgeProps, getSimpleBezierPath } from "@xyflow/react";

import { WaldiezEdge, WaldiezEdgeType, WaldiezNodeAgent, WaldiezNodeAgentType } from "@waldiez/models";
import { useWaldiez } from "@waldiez/store";
import { AGENT_COLORS } from "@waldiez/theme";

export const useWaldiezEdge = (props: EdgeProps<WaldiezEdge> & { type: WaldiezEdgeType }) => {
    const { id, source, type, data, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } =
        props;
    const deleteEdge = useWaldiez(s => s.deleteEdge);
    const getEdgeById = useWaldiez(s => s.getEdgeById);
    const getAgentById = useWaldiez(s => s.getAgentById);
    const onEdgeDoubleClick = useWaldiez(s => s.onEdgeDoubleClick);
    const updateEdgeData = useWaldiez(s => s.updateEdgeData);
    const sourceAgent = getAgentById(source) as WaldiezNodeAgent | null;
    const targetAgent = getAgentById(props.target) as WaldiezNodeAgent | null;
    const [edgePath, labelX, labelY] = getSimpleBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });
    const onOpenModal = (event: React.MouseEvent) => {
        const edge = getEdgeById(id);
        if (edge) {
            onEdgeDoubleClick(event, edge);
        }
    };
    const onDelete = () => {
        deleteEdge(id);
    };
    const getEdgeColor = () => {
        let edgeColor;
        if (sourceAgent) {
            const agentType = sourceAgent.data.agentType as WaldiezNodeAgentType;
            if (["user", "assistant", "manager", "rag_user", "swarm"].includes(agentType)) {
                edgeColor = AGENT_COLORS[agentType];
            }
        }
        return edgeColor;
    };
    const getEdgeNumber = () => {
        let edgeNumber = "";
        if (!sourceAgent || !data) {
            return edgeNumber;
        }
        if (type === "chat") {
            edgeNumber =
                typeof data.order === "number"
                    ? data.order >= 1
                        ? `${data.order}`
                        : data.order === 0
                          ? "1"
                          : "0"
                    : "0";
        } else if (type === "nested") {
            const sourceInitial = (sourceAgent.data.label as string).charAt(0).toUpperCase();
            edgeNumber = `${sourceInitial}.${data.position}`;
        }
        return edgeNumber;
    };
    const onDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const edge = getEdgeById(id);
        if (edge) {
            updateEdgeData(id, { ...edge.data, description: event.target.value });
        }
    };
    return {
        edgePath,
        labelX,
        labelY,
        sourceAgent,
        targetAgent,
        getEdgeById,
        onOpenModal,
        onDelete,
        getEdgeColor,
        getEdgeNumber,
        onDescriptionChange,
    };
};
