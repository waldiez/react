/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { useState } from "react";

import { DropZone, InfoCheckbox, NumberInput } from "@waldiez/components";
import { WaldiezAgentCaptainTabProps } from "@waldiez/containers/nodes/agent/modal/tabs/captain/types";

export const WaldiezAgentCaptainTab = (props: WaldiezAgentCaptainTabProps) => {
    const { id, flowId, data, onDataChange } = props;
    const [localData, setLocalData] = useState(data);
    const [enableAgentLib, setEnableAgentLib] = useState(false);

    const onChange = (partialData: Partial<typeof localData>) => {
        setLocalData({
            ...localData,
            ...partialData,
        });
        onDataChange({
            ...partialData,
        });
    };

    const onMaxRoundChange = (value: number | null) => {
        if (typeof value === "number") {
            onChange({
                maxRound: value,
            });
        }
    };

    const onMaxTurnsChange = (value: number | null) => {
        if (typeof value === "number") {
            onChange({
                maxTurns: value,
            });
        }
    };
    const onToolLibChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        onChange({
            toolLib: checked ? "default" : null,
        });
    };
    const onEnableAgentLibChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnableAgentLib(event.target.checked);
    };
    const onFileUpload = (files: File[]) => {
        console.log(files);
    };
    return (
        <div className="agent-panel agent-codeExecution-panel margin-top--10">
            <InfoCheckbox
                label={"Include agent lib"}
                info={"Include agents lib"}
                checked={enableAgentLib}
                onChange={onEnableAgentLibChange}
                dataTestId={`agent-captain-toggle-agent-lib-${id}`}
            />
            {enableAgentLib && (
                <div>
                    <DropZone flowId={flowId} allowedFileExtensions={[".json"]} onUpload={onFileUpload} />
                </div>
            )}
            <InfoCheckbox
                dataTestId={`tool-lib-${id}`}
                label="Include tool lib"
                info="Include the default tool lib"
                checked={localData.toolLib === "default"}
                onChange={onToolLibChange}
            />
            <NumberInput
                label="Max Round"
                value={localData.maxRound}
                onChange={onMaxRoundChange}
                min={1}
                max={100}
            />
            <NumberInput
                label="Max Turns"
                value={localData.maxTurns}
                onChange={onMaxTurnsChange}
                min={1}
                max={100}
            />
        </div>
    );
};
