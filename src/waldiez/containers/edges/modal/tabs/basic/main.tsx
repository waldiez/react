/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { InfoLabel, NumberInput, Select, TextInput } from "@waldiez/components";
import { useWaldiezEdgeBasicTab } from "@waldiez/containers/edges/modal/tabs/basic/hooks";
import { WaldiezEdgeBasicTabProps } from "@waldiez/containers/edges/modal/tabs/basic/types";

export const WaldiezEdgeBasicTab = (props: WaldiezEdgeBasicTabProps) => {
    const { data, edgeType, edgeId, onTypeChange } = props;
    const {
        summaryRoleOptions,
        summaryOptions,
        edgeTypeOptions,
        summaryMethodLabel,
        summaryRoleValue,
        summaryRoleLabel,
        currentSelectedChatType,
        onLabelChange,
        onDescriptionChange,
        onClearHistoryChange,
        onMaxTurnsChange,
        onSummaryMethodChange,
        onLlmPromptChange,
        onLlmSummaryRoleChange,
    } = useWaldiezEdgeBasicTab(props);
    return (
        <div className="flex-column">
            {edgeType !== "group" && edgeType !== "swarm" && (
                <div className="margin-top--10">
                    <InfoLabel
                        label="Chat Type:"
                        info="The type of the chat. Could be Chat or Nested Chat. Chats are executed in a sequential order. Nested Chats are not always executed (i.e., triggered)."
                    />
                    {/* for tests */}
                    <label className="hidden" htmlFor={`select-chat-type-${edgeId}`}>
                        Chat Type:
                    </label>
                    <Select
                        options={edgeTypeOptions}
                        value={currentSelectedChatType}
                        onChange={onTypeChange}
                        inputId={`select-chat-type-${edgeId}`}
                    />
                </div>
            )}
            {edgeType !== "swarm" && (
                <>
                    <TextInput
                        label="Label:"
                        value={data.label}
                        onChange={onLabelChange}
                        dataTestId={`edge-${edgeId}-label-input`}
                    />
                    <label>Description:</label>
                    <textarea
                        rows={2}
                        defaultValue={data.description}
                        placeholder="Enter a description"
                        onChange={onDescriptionChange}
                        data-testid={`edge-${edgeId}-description-input`}
                    />
                </>
            )}
            {edgeType !== "group" && (
                <>
                    <label className="checkbox-label clear-history-checkbox">
                        <div className="checkbox-label-view">Clear History</div>
                        <input
                            type="checkbox"
                            checked={data.clearHistory === true}
                            onChange={onClearHistoryChange}
                            data-testid={`edge-${edgeId}-clear-history-checkbox`}
                        />
                        <div className="checkbox"></div>
                    </label>
                    <NumberInput
                        label="Max Turns:"
                        min={0}
                        max={100}
                        value={data.maxTurns}
                        onChange={onMaxTurnsChange}
                        onNull={0}
                        setNullOnLower={true}
                        onLowerLabel="No limit"
                        labelInfo="The maximum number of turns for the chat between the two agents. One turn means one conversation round trip. If set to 0, there is no limit."
                        dataTestId={`edge-${edgeId}-max-turns-input`}
                    />
                    <InfoLabel
                        label="Summary Method:"
                        // info="The method to be used to summarize the conversation."
                        info={() => (
                            <div>
                                The method to be used to summarize the conversation. <br />
                                Possible values are: <br />
                                <ul>
                                    <li>
                                        <b>Reflection with LLM:</b> the summary is generated by reflecting on
                                        the conversation and using the Language Model (LLM) to generate the
                                        summary.
                                    </li>
                                    <li>
                                        <b>Last Message:</b> the last message of the conversation is used as
                                        the summary.
                                    </li>
                                    <li>
                                        <b>None:</b> no summary is generated.
                                    </li>
                                </ul>
                            </div>
                        )}
                    />
                    {/* for tests */}
                    <label className="hidden" htmlFor={`select-summary-method-${edgeId}`}>
                        Summary Method:
                    </label>
                    <Select
                        options={summaryOptions}
                        value={{
                            label: summaryMethodLabel,
                            value: data.summary.method,
                        }}
                        onChange={onSummaryMethodChange}
                        inputId={`select-summary-method-${edgeId}`}
                    />
                    {data.summary.method === "reflection_with_llm" && (
                        <>
                            <InfoLabel
                                label="Summary Prompt:"
                                info="The prompt to be used for the summary generation."
                            />
                            <textarea
                                placeholder="Enter the summary prompt"
                                rows={2}
                                defaultValue={data.summary.prompt}
                                onChange={onLlmPromptChange}
                                data-testid={`edge-${edgeId}-llm-prompt-input`}
                            />
                            <label htmlFor={`select-summary-role-${edgeId}`}>Summary Role:</label>
                            <Select
                                options={summaryRoleOptions}
                                value={{
                                    label: summaryRoleLabel,
                                    value: summaryRoleValue,
                                }}
                                onChange={onLlmSummaryRoleChange}
                                inputId={`select-summary-role-${edgeId}`}
                            />
                        </>
                    )}
                </>
            )}
        </div>
    );
};
