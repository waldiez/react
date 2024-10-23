import { getAgentModelsView, getAgentSkillsView } from '@waldiez/components/nodes/agent/view/body/common';
import { WaldiezNodeAgentNoManagerViewProps } from '@waldiez/components/nodes/agent/view/body/types';

export const WaldiezNodeAgentNoManagerView = (props: WaldiezNodeAgentNoManagerViewProps) => {
  const { id, data, onDataChange, skills, agentModelNames, agentModelLogos, agentWaldiezModelAPITypes } =
    props;
  const agentModelsView = getAgentModelsView(id, agentModelNames, agentModelLogos, agentWaldiezModelAPITypes);
  const agentSkillsView = getAgentSkillsView(id, data, skills);
  const onSystemMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onDataChange(
      {
        systemMessage: event.target.value
      },
      true
    );
  };
  return (
    <div className="agent-content nodrag nopan" data-testid={`agent-${id}-content`}>
      <div className="agent-body">
        <div className="agent-models">{agentModelsView}</div>
        <div className="agent-skills">{agentSkillsView}</div>
        <>
          <label>System Message:</label>
          <textarea
            rows={2}
            value={data.systemMessage ?? ''}
            onChange={onSystemMessageChange}
            data-testid={`agent-system-message-${id}`}
          />
        </>
      </div>
    </div>
  );
};
