import { NodeProps } from '@xyflow/react';

import { FaCopy, FaGear, FaTrashCan } from 'react-icons/fa6';

import { getImportExportView } from '@waldiez/components/nodes/common';
import { useWaldiezNodeModel } from '@waldiez/components/nodes/model/hooks';
import { WaldiezNodeModelModal } from '@waldiez/components/nodes/model/modal';
import { WaldiezModelNode } from '@waldiez/models';
import { renderDate } from '@waldiez/utils';

export const WaldiezNodeModel = ({ id, data }: NodeProps<WaldiezModelNode>) => {
  const {
    flowId,
    isOpen,
    isDirty,
    logo,
    modelData,
    setLogo,
    onOpen,
    onImport,
    onExport,
    onDataChange,
    onDelete,
    onClone,
    onSave,
    onCancel
  } = useWaldiezNodeModel(id, data);
  const importExportView = getImportExportView(flowId, id, 'model', onImport, onExport);
  return (
    <div className={isOpen ? 'model-node nodrag nowheel' : 'model-node nodrag'}>
      <div className="model-header">
        <div
          role="button"
          className="clickable"
          id={`open-node-modal-${id}`}
          data-testid={`open-node-modal-${id}`}
          onClick={onOpen}
        >
          <FaGear />
        </div>
        <div id={`node-label-${id}`} className="node-label" data-testid={`node-label-${id}`}>
          {data.label}
        </div>
        <div className={`model-logo ${data.apiType}`}>
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="model-content">
        <div className="description">{data.description}</div>
        <div className="date-info">{renderDate(data.updatedAt)}</div>
      </div>
      <div className="model-footer" data-testid={`model-footer-${id}`}>
        <div
          role="button"
          className="clickable"
          id={`delete-node-${id}`}
          data-testid={`delete-node-${id}`}
          onClick={onDelete}
        >
          <FaTrashCan />
        </div>
        <div
          role="button"
          className="clickable"
          id={`clone-node-${id}`}
          data-testid={`clone-node-${id}`}
          onClick={onClone}
        >
          <FaCopy />
        </div>
      </div>
      <WaldiezNodeModelModal
        modelId={id}
        data={modelData}
        isOpen={isOpen}
        isDirty={isDirty}
        importExportView={importExportView}
        onLogoChange={setLogo}
        onDataChange={onDataChange}
        onClose={onCancel}
        onCancel={onCancel}
        onSave={onSave}
      />
    </div>
  );
};
