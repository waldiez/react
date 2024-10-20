import { getAgentModelsView, getAgentSkillsView } from '@waldiez/components/nodes/agent/view/body/common';
import { WaldieNodeAgentNoManagerViewProps } from '@waldiez/components/nodes/agent/view/body/types';

export const WaldieNodeAgentNoManagerView = (props: WaldieNodeAgentNoManagerViewProps) => {
  const { id, data, onDataChange, skills, agentModelNames, agentModelLogos, agentWaldieModelAPITypes } =
    props;
  const agentModelsView = getAgentModelsView(id, agentModelNames, agentModelLogos, agentWaldieModelAPITypes);
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
