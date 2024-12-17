import { NodeProps } from '@xyflow/react';

import { FaCopy, FaGear, FaTrashCan } from 'react-icons/fa6';

import { useWaldiezNodeSkill } from '@waldiez/components/nodes/skill/hooks';
import { WaldiezSkillNodeModal } from '@waldiez/components/nodes/skill/modal';
import { WaldiezSkillNode } from '@waldiez/models';

export const WaldiezNodeSkill = ({ id, data }: NodeProps<WaldiezSkillNode>) => {
  const {
    flowId,
    isModalOpen,
    isDirty,
    skillData,
    isDark,
    updatedAt,
    onOpen,
    onClone,
    onDelete,
    onCancel,
    onSave,
    onChange,
    onExport,
    onImport
  } = useWaldiezNodeSkill(id, data);
  return (
    <div className={isModalOpen ? 'skill-node nodrag nowheel' : 'skill-node nodrag'}>
      <div className="skill-header">
        <div
          role="button"
          title="Edit"
          className="clickable"
          id={`open-skill-node-modal-${id}`}
          data-testid={`open-skill-node-modal-${id}`}
          onClick={onOpen}
        >
          <FaGear />
        </div>
        <div id={`node-label-${id}`} data-testid={`node-label-${id}`} className="node-label">
          {data.label}
        </div>
      </div>
      <div className="skill-content">
        <div className="description" data-test-id={`node-description-${id}`}>
          {data.description}
        </div>
        <div className="date-info">{updatedAt}</div>
      </div>
      <div className="skill-footer" data-testid={`skill-footer-${id}`}>
        <div
          role="button"
          title="Delete"
          className="clickable"
          id={`delete-node-${id}`}
          data-testid={`delete-node-${id}`}
          onClick={onDelete}
        >
          <FaTrashCan />
        </div>
        <div
          role="button"
          title="Clone"
          className="clickable"
          id={`clone-node-${id}`}
          data-testid={`clone-node-${id}`}
          onClick={onClone}
        >
          <FaCopy />
        </div>
      </div>
      <WaldiezSkillNodeModal
        skillId={id}
        flowId={flowId}
        data={skillData}
        isModalOpen={isModalOpen}
        darkMode={isDark}
        isDirty={isDirty}
        onClose={onCancel}
        onCancel={onCancel}
        onSave={onSave}
        onDataChange={onChange}
        onImport={onImport}
        onExport={onExport}
      />
    </div>
  );
};
