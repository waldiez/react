import { BaseEdge, EdgeLabelRenderer, EdgeProps } from "@xyflow/react";

import { FaTrashAlt } from "react-icons/fa";
import { FaGear, FaPeopleGroup } from "react-icons/fa6";
import { GiNestEggs } from "react-icons/gi";
import { GoAlert } from "react-icons/go";
import { MdMessage } from "react-icons/md";

import { useWaldiezEdge } from "@waldiez/components/edges/hooks";
import { WaldiezEdgeProps } from "@waldiez/components/edges/types";
import { WaldiezEdge } from "@waldiez/models";

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

const WaldiezEdgeCommon = (props: WaldiezEdgeProps) => {
    const { id, type, data, style = {}, markerEnd } = props;
    const {
        edgePath,
        labelX,
        labelY,
        sourceAgent,
        onOpenModal,
        onDelete,
        getEdgeColor,
        getEdgeNumber,
        onDescriptionChange,
    } = useWaldiezEdge(props);
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
    const edgeNumber = getEdgeNumber();
    const edgeIcon = getEdgeIcon();
    const className = "nodrag nopan agent-edge-box";
    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: "absolute",
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        // everything inside EdgeLabelRenderer has no pointer events by default
                        // if you have an interactive element, set pointer-events: all
                    }}
                    className={className}
                    data-testid={`edge-label-${id}`}
                >
                    <div className="agent-edge-view">
                        <div className="edge-header">
                            <div className="edge-position">
                                {edgeNumber === "0" ? (
                                    <GoAlert size={16} className="edge-position-warning-icon" />
                                ) : (
                                    edgeNumber
                                )}
                            </div>
                            <div className="edge-icon">{edgeIcon}</div>
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
                    </div>
                </div>
            </EdgeLabelRenderer>
        </>
    );
};
