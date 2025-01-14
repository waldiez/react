import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from "@xyflow/react";

import { GiNestEggs } from "react-icons/gi";
import { MdMessage } from "react-icons/md";
import { TbHandOff } from "react-icons/tb";

import { WaldiezEdgeProps } from "@waldiez/containers/edges/types";
import { useWaldiez } from "@waldiez/store";
import { AGENT_COLORS } from "@waldiez/theme";

export const WaldiezEdgeSwarmView = (
    props: WaldiezEdgeProps & {
        swarmType: "handoff" | "nested" | "source";
    },
) => {
    const { swarmType } = props;
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
            <TbHandOff color={edgeColor} size={size} />
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
    const className = swarmType === "source" ? "agent-edge-from-user-to-swarm" : "agent-edge-from-swarm";
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
                    className={"nodrag nopan clickable agent-edge-swarm-box"}
                    data-testid={`edge-label-${id}`}
                    onClick={onOpenModal}
                >
                    <div className={`agent-edge-swarm-view clickable ${className}`}>{icon}</div>
                </div>
            </EdgeLabelRenderer>
        </>
    );
};
