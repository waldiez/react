import { BaseEdge, EdgeLabelRenderer, Position, getSmoothStepPath } from "@xyflow/react";

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
    const updateEdgeData = useWaldiez(s => s.updateEdgeData);
    const deleteEdge = useWaldiez(s => s.deleteEdge);
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
        deleteEdge(id);
    };
    const onMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const edge = getEdgeById(id);
        if (edge) {
            updateEdgeData(id, {
                ...edge.data,
                message: { type: "string", content: event.target.value, context: {}, use_carryover: false },
            });
        }
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
                        placeholder="Message"
                        value={data?.message.content ?? ""}
                        rows={1}
                        data-testid={`edge-${id}-description`}
                        onChange={onMessageChange}
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
    const noOp = () => {};
    const EdgeLabel = ({ transform }: { transform: string }) => {
        const edge = getEdgeById(id);
        if (!edge) {
            return null;
        }
        const label = edge.data?.label ?? "";
        if (label === "") {
            return null;
        }
        const trimmedTo20 = label.length > 15 ? `${label.slice(0, 15)}...` : label;
        return (
            <div
                style={{
                    position: "absolute",
                    // background: "red",
                    padding: 10,
                    color: "currentcolor",
                    fontSize: 12,
                    fontWeight: 700,
                    zIndex: 10000,
                    transform,
                }}
                className="nodrag nopan"
            >
                {trimmedTo20}
            </div>
        );
    };
    const className = swarmType === "source" ? "agent-edge-box" : "clickable agent-edge-swarm-box";
    const translations = {
        edgeStart: `translate(-50%, 0%) translate(${sourceX}px,${sourceY}px)`,
        edgeEnd: `translate(-50%, 0%) translate(${targetX}px,${targetY}px)`,
    };
    if (sourcePosition === Position.Right && targetPosition === Position.Left) {
        translations.edgeStart = `translate(0%, 0%) translate(${sourceX}px,${sourceY - 35}px)`;
        translations.edgeEnd = `translate(-100%, -100%) translate(${targetX}px,${targetY}px)`;
    }
    if (sourcePosition === Position.Left && targetPosition === Position.Right) {
        translations.edgeStart = `translate(-100%, 0%) translate(${sourceX}px,${sourceY}px)`;
        translations.edgeEnd = `translate(0, 0) translate(${targetX}px,${targetY}px)`;
    }
    if (sourcePosition === Position.Top && targetPosition === Position.Bottom) {
        translations.edgeStart = `translate(-100%, 0%) translate(${sourceX}px,${sourceY - 30}px)`;
        translations.edgeEnd = `translate(-100%, 0%) translate(${targetX}px,${targetY}px)`;
    }
    if (sourcePosition === Position.Bottom && targetPosition === Position.Top) {
        translations.edgeStart = `translate(0%, 0%) translate(${sourceX}px,${sourceY}px)`;
        translations.edgeEnd = `translate(0%, 0%) translate(${targetX}px,${targetY - 30}px)`;
    }
    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
            <EdgeLabelRenderer>
                <EdgeLabel transform={translations.edgeStart} />
                <div
                    role="button"
                    style={{
                        position: "absolute",
                        transform: `translate(-50%, -50%) translate(${labelX + 0}px,${labelY}px)`,
                        pointerEvents: "all",
                        // everything inside EdgeLabelRenderer has no pointer events by default
                        // if you have an interactive element, set pointer-events: all
                    }}
                    className={`nodrag nopan ${className}`}
                    data-testid={`edge-label-${id}`}
                    onClick={swarmType === "source" ? noOp : onOpenModal}
                >
                    {swarmType === "source" ? (
                        getSwarmSourceView()
                    ) : (
                        <div className={"agent-edge-swarm-view clickable agent-edge-from-swarm"}>{icon}</div>
                    )}
                </div>
                {/* <EdgeLabel transform={translations.edgeEnd} /> */}
            </EdgeLabelRenderer>
        </>
    );
};
