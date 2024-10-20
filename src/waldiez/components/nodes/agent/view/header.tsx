import { FaDatabase } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';

import { WaldieNodeAgentHeaderViewProps } from '@waldiez/components/nodes/agent/view/types';
import { AGENT_COLORS, AGENT_HEAD_ICONS } from '@waldiez/theme';

export const WaldieNodeAgentHeaderView = (props: WaldieNodeAgentHeaderViewProps) => {
  const { id, data, onOpenNodeModal } = props;
  const agentType = data.agentType;
  const agentSvg =
    agentType === 'assistant'
      ? AGENT_HEAD_ICONS.assistant
      : agentType === 'manager'
        ? AGENT_HEAD_ICONS.manager
        : AGENT_HEAD_ICONS.user;
  return (
    <div className="agent-header">
      <div className="agent-header-left">
        <FaGear role="button" onClick={onOpenNodeModal} />
        {data.agentType === 'rag_user' && <FaDatabase color={AGENT_COLORS.rag_user} />}
        <div className="agent-label" data-testid={`agent-header-label-${id}`}>
          {data.label}
        </div>
      </div>
      <img src={agentSvg} />
    </div>
  );
};
