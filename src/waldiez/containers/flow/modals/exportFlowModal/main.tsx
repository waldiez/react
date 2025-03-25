/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { Modal } from "@waldiez/components";
import { ExportFlowModalProps } from "@waldiez/containers/flow/modals/exportFlowModal/types";

export const ExportFlowModal = (props: ExportFlowModalProps) => {
    const { flowId, isOpen, onClose } = props;
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Import Flow"
            dataTestId={`import-flow-modal-${flowId}`}
        >
            <div className="modal-body padding-10">Export flow modal</div>
        </Modal>
    );
};
