import { FaDatabase } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';

import { WaldiezNodeAgentHeaderViewProps } from '@waldiez/components/nodes/agent/view/types';
import { AGENT_COLORS, AGENT_ICONS } from '@waldiez/theme';

export const WaldiezNodeAgentHeaderView = (props: WaldiezNodeAgentHeaderViewProps) => {
  const { id, data, onOpenNodeModal } = props;
  const agentType = data.agentType;
  const agentSvg =
    agentType === 'assistant'
      ? AGENT_ICONS.assistant
      : agentType === 'manager'
        ? AGENT_ICONS.manager
        : AGENT_ICONS.user;
  return (
    <div className="agent-header">
      <div className="agent-header-left">
        <FaGear role="button" className="clickable" onClick={onOpenNodeModal} />
        {data.agentType === 'rag_user' && <FaDatabase color={AGENT_COLORS.rag_user} />}
        <div className="agent-label" data-testid={`agent-header-label-${id}`}>
          {data.label}
        </div>
      </div>
      <img src={agentSvg} />
    </div>
  );
};
