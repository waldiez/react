import { FaCopy } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

import { useWaldiezNodeAgentFooter } from "@waldiez/components/nodes/agent/hooks";
import { WaldiezAgentNodeData } from "@waldiez/models";
import { renderDate } from "@waldiez/utils";

export const WaldiezNodeAgentFooter = (props: {
    id: string;
    data: WaldiezAgentNodeData;
    isModalOpen: boolean;
}) => {
    const { id, data } = props;
    const { onDelete, onClone } = useWaldiezNodeAgentFooter(props);
    return (
        <div className="agent-footer" data-testid={`agent-footer-${id}`}>
            <div className="agent-actions">
                <FaTrashCan
                    role="button"
                    onClick={onDelete}
                    title="Delete Agent"
                    className={"delete-agent no-margin no-padding clickable"}
                />
                <div className="date-info">{renderDate(data.updatedAt)}</div>
                <FaCopy
                    role="button"
                    onClick={onClone}
                    title="Clone Agent"
                    className={"clone-agent no-margin no-padding clickable"}
                />
            </div>
        </div>
    );
};
