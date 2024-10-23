import { Node } from '@xyflow/react';

import { WaldiezNodeAgentManagerBodyView } from '@waldiez/components/nodes/agent/view/body/manager';
import { WaldiezNodeAgentNoManagerView } from '@waldiez/components/nodes/agent/view/body/no_manager';
import { WaldiezNodeAgentBodyViewProps } from '@waldiez/components/nodes/agent/view/body/types';
import { useWaldiezContext } from '@waldiez/store';
import { LOGOS } from '@waldiez/theme';
import { WaldiezAgentNode, WaldiezAgentNodeData, WaldiezModelNode, WaldiezSkillNode } from '@waldiez/types';

export const WaldiezNodeAgentBodyView = (props: WaldiezNodeAgentBodyViewProps) => {
  const { id, parentId, data, isNodeModalOpen, isEdgeModalOpen, onDataChange } = props;
  const getSkills = useWaldiezContext(s => s.getSkills);
  const getModels = useWaldiezContext(s => s.getModels);
  const getGroupMembers = useWaldiezContext(s => s.getGroupMembers);
  const removeGroupMember = useWaldiezContext(s => s.removeGroupMember);
  const onNodeDoubleClick = useWaldiezContext(s => s.onNodeDoubleClick);
  const getAgentById = useWaldiezContext(s => s.getAgentById);
  const reselectNode = useWaldiezContext(s => s.reselectNode);
  const models = getModels() as WaldiezModelNode[];
  const skills = getSkills() as WaldiezSkillNode[];
  const agentType = data.agentType;
  const agentModelNames = data.modelIds
    .map(modelId => models.find(model => model.id === modelId)?.data.label ?? '')
    .filter(entry => entry !== '');
  const agentWaldiezModelAPITypes = data.modelIds
    .map(modelId => models.find(model => model.id === modelId)?.data.apiType ?? '')
    .filter(entry => entry !== '');
  const agentModelLogos = agentWaldiezModelAPITypes
    .map(apiType => LOGOS[apiType] ?? '')
    .filter(entry => entry !== '');
  const onOpenMemberModal = (member: Node) => {
    if (!isNodeModalOpen && !isEdgeModalOpen) {
      onNodeDoubleClick(null, member);
    }
  };
  const onRemoveMember = (member: Node) => {
    if (!parentId && data.agentType === 'manager') {
      removeGroupMember(id, member.id);
      const storedAgent = getAgentById(id);
      if (!storedAgent) {
        return;
      }
      if (storedAgent.data) {
        onDataChange({ ...(storedAgent.data as WaldiezAgentNodeData) });
      }
      setTimeout(() => {
        reselectNode(member.id);
      }, 200);
    }
  };
  const groupMembers = getGroupMembers(id) as WaldiezAgentNode[];
  return agentType === 'manager' ? (
    <WaldiezNodeAgentManagerBodyView
      id={id}
      data={data}
      skills={skills}
      agentModelNames={agentModelNames}
      agentWaldiezModelAPITypes={agentWaldiezModelAPITypes}
      groupMembers={groupMembers}
      agentModelLogos={agentModelLogos}
      onOpenMemberModal={onOpenMemberModal}
      onRemoveMember={onRemoveMember}
    />
  ) : (
    <WaldiezNodeAgentNoManagerView
      id={id}
      data={data}
      onDataChange={onDataChange}
      skills={skills}
      agentModelNames={agentModelNames}
      agentModelLogos={agentModelLogos}
      agentWaldiezModelAPITypes={agentWaldiezModelAPITypes}
    />
  );
};
