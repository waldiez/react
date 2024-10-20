import { Node } from '@xyflow/react';

import { WaldieNodeAgentManagerBodyView } from '@waldiez/components/nodes/agent/view/body/manager';
import { WaldieNodeAgentNoManagerView } from '@waldiez/components/nodes/agent/view/body/no_manager';
import { WaldieNodeAgentBodyViewProps } from '@waldiez/components/nodes/agent/view/body/types';
import { useWaldieContext } from '@waldiez/store';
import { LOGOS } from '@waldiez/theme';
import { WaldieAgentNode, WaldieAgentNodeData, WaldieModelNode, WaldieSkillNode } from '@waldiez/types';

export const WaldieNodeAgentBodyView = (props: WaldieNodeAgentBodyViewProps) => {
  const { id, parentId, data, isNodeModalOpen, isEdgeModalOpen, onDataChange } = props;
  const getSkills = useWaldieContext(s => s.getSkills);
  const getModels = useWaldieContext(s => s.getModels);
  const getGroupMembers = useWaldieContext(s => s.getGroupMembers);
  const removeGroupMember = useWaldieContext(s => s.removeGroupMember);
  const onNodeDoubleClick = useWaldieContext(s => s.onNodeDoubleClick);
  const getAgentById = useWaldieContext(s => s.getAgentById);
  const reselectNode = useWaldieContext(s => s.reselectNode);
  const models = getModels() as WaldieModelNode[];
  const skills = getSkills() as WaldieSkillNode[];
  const agentType = data.agentType;
  const agentModelNames = data.modelIds
    .map(modelId => models.find(model => model.id === modelId)?.data.label ?? '')
    .filter(entry => entry !== '');
  const agentWaldieModelAPITypes = data.modelIds
    .map(modelId => models.find(model => model.id === modelId)?.data.apiType ?? '')
    .filter(entry => entry !== '');
  const agentModelLogos = agentWaldieModelAPITypes
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
        onDataChange({ ...(storedAgent.data as WaldieAgentNodeData) });
      }
      setTimeout(() => {
        reselectNode(member.id);
      }, 200);
    }
  };
  const groupMembers = getGroupMembers(id) as WaldieAgentNode[];
  return agentType === 'manager' ? (
    <WaldieNodeAgentManagerBodyView
      id={id}
      data={data}
      skills={skills}
      agentModelNames={agentModelNames}
      agentWaldieModelAPITypes={agentWaldieModelAPITypes}
      groupMembers={groupMembers}
      agentModelLogos={agentModelLogos}
      onOpenMemberModal={onOpenMemberModal}
      onRemoveMember={onRemoveMember}
    />
  ) : (
    <WaldieNodeAgentNoManagerView
      id={id}
      data={data}
      onDataChange={onDataChange}
      skills={skills}
      agentModelNames={agentModelNames}
      agentModelLogos={agentModelLogos}
      agentWaldieModelAPITypes={agentWaldieModelAPITypes}
    />
  );
};
