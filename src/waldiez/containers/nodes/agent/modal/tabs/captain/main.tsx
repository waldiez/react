/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { Collapsible, DropZone, InfoCheckbox, NumberInput } from "@waldiez/components";
import { useWaldiezAgentCaptain } from "@waldiez/containers/nodes/agent/modal/tabs/captain/hooks";
import { WaldiezAgentCaptainTabProps } from "@waldiez/containers/nodes/agent/modal/tabs/captain/types";

const EXAMPLE_LIB_LINK = "https://github.com/ag2ai/ag2/blob/main/notebook/agent_library_example.json";

export const WaldiezAgentCaptainTab = (props: WaldiezAgentCaptainTabProps) => {
    const { id, flowId } = props;
    const {
        agentLib,
        agentData,
        enableAgentLib,
        onEnableAgentLibChange,
        onFileUpload,
        onMaxRoundChange,
        onMaxTurnsChange,
    } = useWaldiezAgentCaptain(props);

    return (
        <div className="agent-panel agent-codeExecution-panel margin-top--10">
            <NumberInput
                label="Max Round"
                value={agentData.maxRound}
                onChange={onMaxRoundChange}
                dataTestId={`agent-captain-max-round-${id}`}
                min={1}
                max={100}
            />
            <NumberInput
                label="Max Turns"
                value={agentData.maxTurns}
                onChange={onMaxTurnsChange}
                dataTestId={`agent-captain-max-turns-${id}`}
                min={1}
                max={100}
            />
            {/* <InfoCheckbox
                dataTestId={`tool-lib-${id}`}
                label="Include tool lib"
                info="When enabled, the captain agent will use "
                checked={agentData.toolLib === "default"}
                onChange={onToolLibChange}
            /> */}
            <InfoCheckbox
                label={"Include agent lib"}
                info={"When enabled, the captain agent will generate agents from a dedicated agents library"}
                checked={enableAgentLib}
                onChange={onEnableAgentLibChange}
                dataTestId={`agent-captain-toggle-agent-lib-${id}`}
            />
            <div className="margin-bottom-10">
                {" "}
                You can find an example of agents library{" "}
                <a href={EXAMPLE_LIB_LINK} target="_blank" rel="noreferrer">
                    here
                </a>
            </div>
            {enableAgentLib && (
                <div>
                    <DropZone flowId={flowId} allowedFileExtensions={[".json"]} onUpload={onFileUpload} />
                    {agentLib.length > 0 && (
                        <div className="margin-top-10">
                            <Collapsible
                                title={`Agent Library (${agentLib.length} entries)`}
                                dataTestId={`agent-lib-${id}`}
                                expanded={false}
                                fullWidth
                            >
                                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                                    <pre>{JSON.stringify(agentLib, null, 2)}</pre>
                                </div>
                            </Collapsible>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
