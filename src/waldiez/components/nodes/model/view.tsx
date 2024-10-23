import { FaCopy, FaGear, FaTrashCan } from 'react-icons/fa6';

import { getImportExportView } from '@waldiez/components/nodes/common';
import { WaldiezNodeModelModal } from '@waldiez/components/nodes/model/modal';
import { WaldiezNodeModelViewProps } from '@waldiez/components/nodes/model/types';

const renderDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
};

export const WaldiezNodeModelView = (props: WaldiezNodeModelViewProps) => {
  const {
    modelId,
    data,
    flowId,
    isOpen,
    logo,
    setLogo,
    onOpen,
    onClose,
    onImport,
    onExport,
    onDataChange,
    onDelete,
    onClone,
    onSubmit,
    onCancel
  } = props;
  const importExportView = getImportExportView(flowId, modelId, 'model', onImport, onExport);
  return (
    <div className={isOpen ? 'model-node nodrag nowheel' : 'model-node nodrag'}>
      <div className="model-header">
        <div
          role="button"
          className="clickable"
          id={`open-node-modal-${modelId}`}
          data-testid={`open-node-modal-${modelId}`}
          onClick={onOpen}
        >
          <FaGear />
        </div>
        <div id={`node-label-${modelId}`} className="node-label" data-testid={`node-label-${modelId}`}>
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
      <div className="model-footer" data-testid={`model-footer-${modelId}`}>
        <div
          role="button"
          className="clickable"
          id={`delete-node-${modelId}`}
          data-testid={`delete-node-${modelId}`}
          onClick={onDelete}
        >
          <FaTrashCan />
        </div>
        <div
          role="button"
          className="clickable"
          id={`clone-node-${modelId}`}
          data-testid={`clone-node-${modelId}`}
          onClick={onClone}
        >
          <FaCopy />
        </div>
      </div>
      <WaldiezNodeModelModal
        modelId={modelId}
        data={data}
        isOpen={isOpen}
        importExportView={importExportView}
        onLogoChange={setLogo}
        onDataChange={onDataChange}
        onClose={onClose}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </div>
  );
};
