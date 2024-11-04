import { WaldiezEdgeBasicTab } from '@waldiez/components/edges/modal/tabs/basic';
import { WaldiezEdgeMessageTab } from '@waldiez/components/edges/modal/tabs/message';
import { WaldiezEdgeNestedTab } from '@waldiez/components/edges/modal/tabs/nested';
import { WaldiezEdgeModalViewProps } from '@waldiez/components/edges/modal/types';
import { Modal } from '@waldiez/components/modal';
import { TabItem, TabItems } from '@waldiez/components/tabs';

export const WaldiezEdgeModalView = (props: WaldiezEdgeModalViewProps) => {
  const {
    flowId,
    edgeId,
    data,
    isOpen,
    isDirty,
    darkMode,
    edgeType,
    sourceIsRagUser,
    onDataChange,
    onTypeChange,
    onCancel,
    onSubmit,
    onClose
  } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={data.label} dataTestId={`edge-modal-${edgeId}`}>
      <div className="modal-body edge-modal">
        {edgeType !== 'group' ? (
          <TabItems activeTabIndex={0}>
            <TabItem label="Properties" id={`we-${flowId}-edge-properties-${edgeId}`}>
              <WaldiezEdgeBasicTab
                edgeId={edgeId}
                data={data}
                edgeType={edgeType}
                onTypeChange={onTypeChange}
                onDataChange={onDataChange}
              />
            </TabItem>
            {edgeType === 'chat' && (
              <TabItem label="Message" id={`we-${flowId}-edge-message-${edgeId}`}>
                <WaldiezEdgeMessageTab
                  edgeId={edgeId}
                  data={data}
                  darkMode={darkMode}
                  skipRagOption={!sourceIsRagUser}
                  onDataChange={onDataChange}
                />
              </TabItem>
            )}
            {edgeType === 'nested' && (
              <TabItem label="Nested Chat" id={`we-${flowId}-edge-nested-${edgeId}`}>
                <WaldiezEdgeNestedTab
                  flowId={flowId}
                  edgeId={edgeId}
                  darkMode={darkMode}
                  data={data}
                  onDataChange={onDataChange}
                />
              </TabItem>
            )}
          </TabItems>
        ) : (
          <WaldiezEdgeBasicTab
            edgeId={edgeId}
            data={data}
            edgeType="group"
            onDataChange={onDataChange}
            onTypeChange={onTypeChange}
          />
        )}
        <div className="modal-actions">
          <button className="modal-action-cancel" onClick={onCancel} data-testid="modal-cancel-btn">
            Cancel
          </button>
          <button
            className="modal-action-submit"
            onClick={onSubmit}
            data-testid="modal-submit-btn"
            disabled={!isDirty}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};
