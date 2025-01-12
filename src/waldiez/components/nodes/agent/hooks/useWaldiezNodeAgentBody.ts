import { Node } from "@xyflow/react";

import { WaldiezAgentNode, WaldiezAgentNodeData } from "@waldiez/models";
import { useWaldiezContext } from "@waldiez/store";

export const useWaldiezNodeAgentBody = (props: {
    id: string;
    data: WaldiezAgentNodeData;
    isModalOpen: boolean;
}) => {
    const { id, data, isModalOpen } = props;
    const getGroupMembers = useWaldiezContext(s => s.getGroupMembers);
    const getAgentById = useWaldiezContext(s => s.getAgentById);
    const updateAgentData = useWaldiezContext(s => s.updateAgentData);
    const onNodeDoubleClick = useWaldiezContext(s => s.onNodeDoubleClick);
    const removeGroupMember = useWaldiezContext(s => s.removeGroupMember);
    const reselectNode = useWaldiezContext(s => s.reselectNode);
    const groupMembers = getGroupMembers(id) as WaldiezAgentNode[];
    const onDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!isModalOpen) {
            const agent = getAgentById(id) as WaldiezAgentNode;
            if (agent) {
                updateAgentData(id, { ...agent.data, description: event.target.value });
            }
        }
    };
    const onOpenMemberModal = (member: Node) => {
        if (!isModalOpen) {
            onNodeDoubleClick(null, member);
        }
    };
    const onRemoveGroupMember = (member: Node) => {
        if (!isModalOpen) {
            if (!data.parentId && data.agentType === "manager") {
                removeGroupMember(id, member.id);
                const storedAgent = getAgentById(id);
                if (!storedAgent) {
                    return;
                }
                if (storedAgent.data) {
                    updateAgentData(id, { ...(storedAgent.data as WaldiezAgentNodeData) });
                }
                setTimeout(() => {
                    reselectNode(member.id);
                }, 200);
            }
        }
    };
    return {
        groupMembers,
        onDescriptionChange,
        onRemoveGroupMember,
        onOpenMemberModal,
    };
};
