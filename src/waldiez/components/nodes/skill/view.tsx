import { FaCopy, FaGear, FaTrashCan } from 'react-icons/fa6';

import { WaldiezSkillNodeModal } from '@waldiez/components/nodes/skill/modal';
import { WaldiezNodeSkillViewProps } from '@waldiez/components/nodes/skill/types';

const renderDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
};

export const WaldiezNodeSkillView = (props: WaldiezNodeSkillViewProps) => {
  const {
    skillId,
    flowId,
    data,
    isModalOpen,
    darkMode,
    onOpen,
    onClose,
    onCancel,
    onSubmit,
    onDelete,
    onClone,
    onDataChange,
    onImport,
    onExport
  } = props;
  const updatedAt = renderDate(data.updatedAt);
  return (
    <div className={isModalOpen ? 'skill-node nodrag nowheel' : 'skill-node nodrag'}>
      <div className="skill-header">
        <div
          role="button"
          className="clickable"
          id={`open-node-modal-${skillId}`}
          data-testid={`open-node-modal-${skillId}`}
          onClick={onOpen}
        >
          <FaGear />
        </div>
        <div id={`node-label-${skillId}`} data-testid={`node-label-${skillId}`} className="node-label">
          {data.label}
        </div>
      </div>
      <div className="skill-content">
        <div className="description" data-test-id={`node-description-${skillId}`}>
          {data.description}
        </div>
        <div className="date-info">{updatedAt}</div>
      </div>
      <div className="skill-footer" data-testid={`skill-footer-${skillId}`}>
        <div
          role="button"
          className="clickable"
          id={`delete-node-${skillId}`}
          data-testid={`delete-node-${skillId}`}
          onClick={onDelete}
        >
          <FaTrashCan />
        </div>
        <div
          role="button"
          className="clickable"
          id={`clone-node-${skillId}`}
          data-testid={`clone-node-${skillId}`}
          onClick={onClone}
        >
          <FaCopy />
        </div>
      </div>
      <WaldiezSkillNodeModal
        skillId={skillId}
        flowId={flowId}
        data={data}
        isModalOpen={isModalOpen}
        darkMode={darkMode}
        onClose={onClose}
        onCancel={onCancel}
        onSubmit={onSubmit}
        onDataChange={onDataChange}
        onImport={onImport}
        onExport={onExport}
      />
    </div>
  );
};
