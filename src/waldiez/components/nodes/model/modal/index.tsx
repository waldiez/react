import { Modal } from '@waldiez/components/modal';
import {
  WaldieNodeModelModalAdvancedTab,
  WaldieNodeModelModalBasicTab,
  WaldieNodeModelModalPriceTab
} from '@waldiez/components/nodes/model/modal/tabs';
import { WaldieNodeModelModalProps } from '@waldiez/components/nodes/model/modal/types';
import { TabItem, TabItems } from '@waldiez/components/tabs';

export const WaldieNodeModelModal = (props: WaldieNodeModelModalProps) => {
  const { modelId, data, isOpen, importExportView, onDataChange, onLogoChange, onClose, onSubmit, onCancel } =
    props;
  return (
    <Modal
      beforeTitle={importExportView}
      title={data.label}
      dataTestId={`model-modal-${modelId}`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="modal-body">
        <TabItems activeTabIndex={0}>
          <TabItem label="Basic" id={`model-config-basic-${modelId}`}>
            <WaldieNodeModelModalBasicTab
              data={data}
              onDataChange={onDataChange}
              onLogoChange={onLogoChange}
            />
          </TabItem>
          <TabItem label="Advanced" id={`model-config-advanced-${modelId}`}>
            <WaldieNodeModelModalAdvancedTab data={data} onDataChange={onDataChange} />
          </TabItem>
          <TabItem label="Price" id={`model-config-price-${modelId}`}>
            <WaldieNodeModelModalPriceTab modelId={modelId} data={data} onDataChange={onDataChange} />
          </TabItem>
        </TabItems>
        <div className="modal-actions">
          <button
            className="modal-action-cancel"
            onClick={onCancel}
            data-testid={`modal-cancel-btn-${modelId}`}
          >
            Cancel
          </button>
          <button
            className="modal-action-submit"
            onClick={onSubmit}
            data-testid={`modal-submit-btn-${modelId}`}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};
