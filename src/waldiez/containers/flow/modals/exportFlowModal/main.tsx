/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
// two options:
// - just export and download the flow (same with skipHub=true)
// - share the flow to the hub:
//   - with optional csv/additional files to upload
//   - two options (for start only the first):
//      - a text input for the api key to use for uploading
//      - an oauth flow to login and get a jwt on the callback:
//        for this:
//        - we need to handle the callback url (with the code?=... to get the token)
//        - and once we get the token, we need to continue (how?) with the upload
import { useState } from "react";

import { DropZone, InfoCheckbox, Modal, TextInput } from "@waldiez/components";
import { ExportFlowModalProps } from "@waldiez/containers/flow/modals/exportFlowModal/types";
import { showSnackbar } from "@waldiez/utils";

// const USE_OAUTH = false;

export const ExportFlowModal = (props: ExportFlowModalProps) => {
    const { flowId, isOpen, onClose, onExport } = props;
    const [alsoUpload, setAlsoUpload] = useState(false);
    const [hubApiToken, setHubApiToken] = useState("");
    // const [isOauthFlowOpen, setIsOauthFlowOpen] = useState(false);
    const onAlsoUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAlsoUpload(e.target.checked);
    };
    const onHubApiTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHubApiToken(e.target.value);
    };
    const onUploadToHub = () => {
        showSnackbar(flowId, "Sharing to hub is not yet implemented.", "warning", null, 5000);
    };
    const onAdditionalFilesUpload = (_files: File[]) => {
        showSnackbar(flowId, "Uploading files to hub is not yet implemented.", "warning", null, 5000);
    };
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Export Flow"
            dataTestId={`export-flow-modal-${flowId}`}
        >
            <div className="modal-body padding-10">
                <div className="flex flex-column full-width">
                    <div className="flex flex-column full-width">
                        <InfoCheckbox
                            label="Share to Hub"
                            info={"Check this box to upload the flow to waldiez hub."}
                            checked={alsoUpload}
                            onChange={onAlsoUploadChange}
                            dataTestId={`import-flow-modal-share-${flowId}`}
                        />
                        {alsoUpload && (
                            <div className="flex full-width flex-column">
                                <div className="margin-top-10 full-width">
                                    <TextInput
                                        label="Hub API Token"
                                        value={hubApiToken}
                                        labelInfo={"Url for docs on how to get the token"}
                                        onChange={onHubApiTokenChange}
                                        placeholder="Enter your hub API token"
                                        dataTestId={`hub-api-token-${flowId}`}
                                        style={{ width: "calc(100% - 20px)" }}
                                    />
                                </div>
                                <div className="margin-top-10 margin-bottom-20 full-width">
                                    <div className="margin-bottom-10 padding-10 center">
                                        Additional csv files to include:
                                    </div>
                                    <DropZone
                                        allowedFileExtensions={[".csv"]}
                                        flowId={flowId}
                                        onUpload={onAdditionalFilesUpload}
                                        multiple={true}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="modal-actions">
                <button type="reset" className="modal-action-cancel" onClick={onClose}>
                    Cancel
                </button>
                <div className="flex flex-row">
                    {alsoUpload && (
                        <button
                            type="submit"
                            className="modal-action-submit margin-right-20"
                            onClick={onUploadToHub}
                            data-testid={`upload-to-hub-${flowId}`}
                        >
                            Upload to Hub
                        </button>
                    )}
                    <button type="submit" className="modal-action-submit" onClick={onExport}>
                        Download
                    </button>
                </div>
            </div>
        </Modal>
    );
};
