import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from "@xyflow/react";

import { FaTrashAlt } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { GiNestEggs } from "react-icons/gi";
import { GiShakingHands } from "react-icons/gi";
import { MdMessage } from "react-icons/md";

import { WaldiezEdgeProps } from "@waldiez/containers/edges/types";
import { useWaldiez } from "@waldiez/store";
import { AGENT_COLORS } from "@waldiez/theme";

export const WaldiezEdgeSwarmView = (
    props: WaldiezEdgeProps & {
        swarmType: "handoff" | "nested" | "source";
    },
) => {
    const { swarmType, data } = props;
    const getEdgeById = useWaldiez(s => s.getEdgeById);
    const onEdgeDoubleClick = useWaldiez(s => s.onEdgeDoubleClick);
    const {
        id,
        style = {},
        markerEnd,
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
    } = props;
    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });
    const size = 18;
    const edgeColor = swarmType === "source" ? AGENT_COLORS.user : AGENT_COLORS.swarm;
    const icon =
        swarmType === "handoff" ? (
            <GiShakingHands color={edgeColor} size={size} />
        ) : swarmType === "nested" ? (
            <GiNestEggs color={edgeColor} size={size} />
        ) : (
            <MdMessage color={edgeColor} size={size} />
        );
    const onOpenModal = (event: React.MouseEvent) => {
        const edge = getEdgeById(id);
        if (edge) {
            onEdgeDoubleClick(event, edge);
        }
    };
    const onDelete = () => {
        //
    };
    const onDescriptionChange = () => {
        //
    };
    const getSwarmSourceView = () => {
        return (
            <div className="agent-edge-view">
                <div className="edge-header">
                    <div className="edge-position">1</div>
                    <div className="edge-icon">
                        <MdMessage color={edgeColor} size={size} />
                    </div>
                </div>
                <div className="edge-body">
                    <textarea
                        placeholder="Enter a description"
                        value={data?.description ?? ""}
                        rows={1}
                        data-testid={`edge-${id}-description`}
                        onChange={onDescriptionChange}
                    />
                </div>
                <div className="edge-footer edge-actions">
                    <div
                        title="Delete"
                        role="button"
                        onClick={onDelete}
                        className="delete-edge clickable"
                        data-testid={`delete-edge-${id}`}
                    >
                        <FaTrashAlt />
                    </div>
                    <div
                        title="Edit"
                        role="button"
                        className="open-edge-modal clickable"
                        data-testid={`open-edge-modal-${id}`}
                        onClick={onOpenModal}
                    >
                        <FaGear />
                    </div>
                </div>
            </div>
        );
    };
    const className = swarmType === "source" ? "agent-edge-box" : "agent-edge-swarm-box";
    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
            <EdgeLabelRenderer>
                <div
                    role="button"
                    style={{
                        position: "absolute",
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        pointerEvents: "all",
                        // everything inside EdgeLabelRenderer has no pointer events by default
                        // if you have an interactive element, set pointer-events: all
                    }}
                    className={`nodrag nopan clickable ${className}`}
                    data-testid={`edge-label-${id}`}
                    onClick={onOpenModal}
                >
                    {swarmType === "source" ? (
                        getSwarmSourceView()
                    ) : (
                        <div className={"agent-edge-swarm-view clickable agent-edge-from-swarm"}>{icon}</div>
                    )}
                </div>
            </EdgeLabelRenderer>
        </>
    );
};
