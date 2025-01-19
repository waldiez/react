import { BaseEdge, EdgeLabelRenderer, EdgeProps } from "@xyflow/react";

import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaGear, FaPeopleGroup } from "react-icons/fa6";
import { GiNestEggs } from "react-icons/gi";
import { GoAlert } from "react-icons/go";
import { MdMessage } from "react-icons/md";

import { EdgeLabel } from "@waldiez/containers/edges/edgeLabel";
import { useWaldiezEdge } from "@waldiez/containers/edges/hooks";
import { WaldiezEdgeSwarmView } from "@waldiez/containers/edges/swarm";
import { WaldiezEdgeProps } from "@waldiez/containers/edges/types";
import { getEdgeTranslations } from "@waldiez/containers/edges/utils";
import { WaldiezAgentType, WaldiezEdge } from "@waldiez/models";
import { AGENT_COLORS } from "@waldiez/theme";

export const WaldiezEdgeChat = (props: EdgeProps<WaldiezEdge>) => {
    return <WaldiezEdgeCommon {...props} type="chat" />;
};

export const WaldiezEdgeGroup = (props: EdgeProps<WaldiezEdge>) => {
    return <WaldiezEdgeCommon {...props} type="group" />;
};

export const WaldiezEdgeNested = (props: EdgeProps<WaldiezEdge>) => {
    return <WaldiezEdgeCommon {...props} type="nested" />;
};

export const WaldiezEdgeHidden = (props: EdgeProps<WaldiezEdge>) => {
    return <WaldiezEdgeCommon {...props} type="hidden" />;
};

export const WaldiezEdgeSwarm = (props: EdgeProps<WaldiezEdge>) => {
    return <WaldiezEdgeCommon {...props} type="swarm" />;
};

// eslint-disable-next-line max-statements
const WaldiezEdgeCommon = (props: WaldiezEdgeProps) => {
    const {
        id,
        type,
        data,
        style = {},
        sourceX,
        sourceY,
        sourcePosition,
        targetPosition,
        targetX,
        targetY,
        markerEnd,
    } = props;
    const {
        edgePath,
        labelX,
        labelY,
        sourceAgent,
        targetAgent,
        onOpenModal,
        onDelete,
        getEdgeById,
        getEdgeColor,
        getEdgeNumber,
    } = useWaldiezEdge(props);
    const [focussed, setFocussed] = useState(false);
    if (type === "hidden" || !sourceAgent || !data) {
        // if not hidden, the source agent might be recently deleted
        return <></>;
    }
    const getEdgeIcon = () => {
        const edgeColor = getEdgeColor();
        const size = 18;
        const edgeIcon =
            type === "chat" ? (
                <MdMessage color={edgeColor} size={size} />
            ) : type === "nested" ? (
                <GiNestEggs color={edgeColor} size={size} />
            ) : (
                <FaPeopleGroup color={edgeColor} size={size} />
            );
        return edgeIcon;
    };
    if (type === "swarm") {
        return (
            <WaldiezEdgeSwarmView
                {...props}
                sourceType={sourceAgent.data.agentType as WaldiezAgentType}
                targetType={targetAgent?.data.agentType as WaldiezAgentType}
            />
        );
    }
    const edgeNumber = getEdgeNumber();
    const edge = getEdgeById(id);
    const edgeIcon = getEdgeIcon();
    const className = `nodrag nopan clickable agent-edge-box with-position ${sourceAgent.data.agentType}`;
    const translations = getEdgeTranslations(
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
    );

    const onEdgeClick = (event: React.MouseEvent) => {
        if (focussed) {
            (event.target as HTMLDivElement).blur();
            setFocussed(false);
        } else {
            (event.target as HTMLDivElement).focus();
            setFocussed(true);
        }
    };

    const onEdgeBlur = (event: React.FocusEvent) => {
        (event.target as HTMLDivElement).blur();
        setFocussed(false);
    };

    return (
        <>
            <BaseEdge
                path={edgePath}
                markerEnd={markerEnd}
                style={{ ...style, color: AGENT_COLORS.rag_user }}
            />
            <EdgeLabelRenderer>
                <EdgeLabel edge={edge} transform={translations.edgeStart} />
                <div
                    style={{
                        position: "absolute",
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        // everything inside EdgeLabelRenderer has no pointer events by default
                        // if you have an interactive element, set pointer-events: all
                        pointerEvents: "all",
                    }}
                    className={className}
                    onClick={onEdgeClick}
                    data-testid={`edge-${id}-box`}
                    tabIndex={0}
                    onBlur={onEdgeBlur}
                >
                    {focussed && (
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
                                onClick={onOpenModal}
                                className="open-edge-modal clickable"
                                data-testid={`open-edge-modal-${id}`}
                            >
                                <FaGear />
                            </div>
                        </div>
                    )}
                    {edgeNumber !== "" ? (
                        <div className="agent-edge-view with-position clickable">
                            <div className="edge-position">
                                {edgeNumber === "0" ? (
                                    <GoAlert size={16} className="edge-position-warning-icon" />
                                ) : (
                                    edgeNumber
                                )}
                            </div>
                            {edgeIcon}
                        </div>
                    ) : (
                        <div className="agent-edge-view clickable">{edgeIcon}</div>
                    )}
                </div>
            </EdgeLabelRenderer>
        </>
    );
};

/*
<div className="edge-position">
                                {edgeNumber === "0" ? (
                                    <GoAlert size={16} className="edge-position-warning-icon" />
                                ) : (
                                    edgeNumber
                                )}
                            </div>
 <div className="edge-body">
    <textarea
        placeholder="Enter a description"
        value={data.description}
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
*/
