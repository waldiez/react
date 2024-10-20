import { FaCopy, FaTrashCan } from 'react-icons/fa6';

import { WaldieNodeAgentFooterViewProps } from '@waldiez/components/nodes/agent/view/types';

const renderDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
};
export const WaldieNodeAgentFooterView = (props: WaldieNodeAgentFooterViewProps) => {
  const { id, data, onDelete, onClone } = props;
  return (
    <div className="agent-footer" data-testid={`agent-footer-${id}`}>
      <div className="agent-actions">
        <FaTrashCan
          role="button"
          onClick={onDelete}
          title="Delete Agent"
          className={'delete-agent no-margin no-padding'}
        />
        <div className="date-info">{renderDate(data.updatedAt)}</div>
        <FaCopy
          role="button"
          onClick={onClone}
          title="Clone Agent"
          className={'clone-agent no-margin no-padding'}
        />
      </div>
    </div>
  );
};
