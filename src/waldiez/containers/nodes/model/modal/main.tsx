/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { useEffect, useState } from "react";

import { Modal, TabItem, TabItems } from "@waldiez/components";
import {
    WaldiezNodeModelModalAdvancedTab,
    WaldiezNodeModelModalBasicTab,
    WaldiezNodeModelModalPriceTab,
} from "@waldiez/containers/nodes/model/modal/tabs";
import { WaldiezNodeModelModalProps } from "@waldiez/containers/nodes/model/modal/types";

export const WaldiezNodeModelModal = (props: WaldiezNodeModelModalProps) => {
    const {
        modelId,
        data,
        isOpen,
        isDirty,
        importExportView,
        onDataChange,
        onLogoChange,
        onClose,
        onSave,
        onSaveAndClose,
        onCancel,
    } = props;
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    useEffect(() => {
        setActiveTabIndex(0);
    }, [isOpen]);
    return (
        <Modal
            beforeTitle={importExportView}
            title={data.label}
            dataTestId={`model-modal-${modelId}`}
            isOpen={isOpen}
            onClose={onClose}
            onSaveAndClose={onSaveAndClose}
            hasUnsavedChanges={isDirty}
            preventCloseIfUnsavedChanges
        >
            <div className="modal-body">
                <TabItems activeTabIndex={activeTabIndex}>
                    <TabItem label="Basic" id={`model-config-basic-${modelId}`}>
                        <WaldiezNodeModelModalBasicTab
                            id={modelId}
                            data={data}
                            onDataChange={onDataChange}
                            onLogoChange={onLogoChange}
                        />
                    </TabItem>
                    <TabItem label="Advanced" id={`model-config-advanced-${modelId}`}>
                        <WaldiezNodeModelModalAdvancedTab data={data} onDataChange={onDataChange} />
                    </TabItem>
                    <TabItem label="Price" id={`model-config-price-${modelId}`}>
                        <WaldiezNodeModelModalPriceTab
                            modelId={modelId}
                            data={data}
                            onDataChange={onDataChange}
                        />
                    </TabItem>
                </TabItems>
                <div className="modal-actions">
                    <button
                        type="button"
                        title="Cancel"
                        className="modal-action-cancel"
                        onClick={onCancel}
                        data-testid={`modal-cancel-btn-${modelId}`}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        title="Save"
                        className="modal-action-submit"
                        onClick={onSave}
                        data-testid={`modal-submit-btn-${modelId}`}
                        disabled={!isDirty}
                    >
                        Save
                    </button>
                </div>
            </div>
        </Modal>
    );
};
