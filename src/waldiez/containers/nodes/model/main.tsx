/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { NodeProps } from "@xyflow/react";

import { FaCopy, FaGear, FaTrashCan } from "react-icons/fa6";

import { getImportExportView } from "@waldiez/containers/nodes/common";
import { useWaldiezNodeModel } from "@waldiez/containers/nodes/model/hooks";
import { WaldiezNodeModelModal } from "@waldiez/containers/nodes/model/modal";
import { WaldiezNodeModel } from "@waldiez/models";
import { getDateString } from "@waldiez/utils";

export const WaldiezNodeModelView = ({ id, data }: NodeProps<WaldiezNodeModel>) => {
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
        onSaveAndClose,
        onCancel,
    } = useWaldiezNodeModel(id, data);
    const importExportView = getImportExportView(flowId, id, "model", onImport, onExport);
    return (
        <div className={isOpen ? "model-node nodrag nowheel" : "model-node nodrag"}>
            <div className="model-header">
                <div
                    role="button"
                    title="Edit"
                    className="clickable"
                    // id={`open-model-node-modal-${id}`}
                    data-node-id={id}
                    data-testid={`open-model-node-modal-${id}`}
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
                <div className="date-info">{getDateString(data.updatedAt)}</div>
            </div>
            <div className="model-footer" data-testid={`model-footer-${id}`}>
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
                onSaveAndClose={onSaveAndClose}
            />
        </div>
    );
};
