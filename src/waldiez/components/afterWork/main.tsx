import { useState } from "react";

import { AfterWorkProps } from "@waldiez/components/afterWork/types";
import { Editor } from "@waldiez/components/editor";
import { InfoCheckbox } from "@waldiez/components/infoCheckBox";
import { Select, SingleValue } from "@waldiez/components/select";
import {
    WaldiezNodeAgentSwarm,
    WaldiezSwarmAfterWork,
    WaldiezSwarmAfterWorkOption,
    WaldiezSwarmAfterWorkRecipientType,
} from "@waldiez/types";

export const AfterWork = (props: AfterWorkProps) => {
    const { value, darkMode, onChange } = props;
    const [enabled, setEnabled] = useState(value !== null);
    const [afterWorkLocal, setAfterWorkLocal] = useState<WaldiezSwarmAfterWork>(
        value ?? {
            recipientType: "option",
            recipient: "TERMINATE",
        },
    );
    const afterWorkOptions: {
        value: WaldiezSwarmAfterWorkOption;
        label: string;
    }[] = [
        { value: "TERMINATE", label: "Terminate" },
        { value: "REVERT_TO_USER", label: "Revert to User" },
        { value: "STAY", label: "Stay" },
    ];
    const optionToLabel: { [key in WaldiezSwarmAfterWorkOption]: string } = {
        TERMINATE: "Terminate",
        REVERT_TO_USER: "Revert to User",
        STAY: "Stay",
    };
    const recipientTypeOptions: {
        value: WaldiezSwarmAfterWorkRecipientType;
        label: string;
    }[] = [
        { value: "agent", label: "Agent" },
        { value: "option", label: "Option" },
        { value: "callable", label: "Custom Function" },
    ];
    const recipientToLabel: { [key in WaldiezSwarmAfterWorkRecipientType]: string } = {
        agent: "Agent",
        option: "Option",
        callable: "Custom Function",
    };
    const onEnabledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setEnabled(checked);
        if (!checked) {
            onChange(null);
        } else {
            onChange(afterWorkLocal);
        }
    };
    const agentOptions: {
        label: string;
        value: WaldiezNodeAgentSwarm;
    }[] = props.agents.map(agent => ({
        label: agent.data.label,
        value: agent,
    }));
    const agentOptionToLabel = props.agents.reduce<{ [key: string]: string }>((acc, agent) => {
        acc[agent.id] = agent.data.label;
        return acc;
    }, {});
    const agentOptionToValue = props.agents.reduce<{ [key: string]: WaldiezNodeAgentSwarm }>((acc, agent) => {
        acc[agent.id] = agent;
        return acc;
    }, {});
    const isRecipientAnOption = ["TERMINATE", "REVERT_TO_USER", "STAY"].includes(
        afterWorkLocal.recipient as string,
    );
    const isRecipientAnAgent = agentOptions.some(agent => agent.value.id === afterWorkLocal.recipient);
    const onRecipientTypeChange = (
        option: SingleValue<{ value: WaldiezSwarmAfterWorkRecipientType; label: string }>,
    ) => {
        if (!option) {
            return;
        }
        const recipientType = option.value;
        const recipient =
            recipientType === "option"
                ? "TERMINATE"
                : recipientType === "agent"
                  ? ""
                  : DEFAULT_CUSTOM_AFTER_WORK_RECIPIENT_METHOD_CONTENT;
        const newAfterWork = {
            recipientType,
            recipient,
        };
        setAfterWorkLocal(newAfterWork);
        onChange(newAfterWork);
    };
    const onAfterWorkOptionChange = (
        option: SingleValue<{ value: WaldiezSwarmAfterWorkOption; label: string }>,
    ) => {
        if (!option) {
            return;
        }
        const newAfterWork = {
            recipientType: "option" as WaldiezSwarmAfterWorkRecipientType,
            recipient: option.value,
        };
        setAfterWorkLocal(newAfterWork);
        onChange(newAfterWork);
    };
    const onAfterWorkAgentChange = (option: SingleValue<{ label: string; value: WaldiezNodeAgentSwarm }>) => {
        if (!option) {
            return;
        }
        const newAfterWork = {
            recipientType: "agent" as WaldiezSwarmAfterWorkRecipientType,
            recipient: option.value.id,
        };
        setAfterWorkLocal(newAfterWork);
        onChange(newAfterWork);
    };
    const onAfterWorkCallableChange = (value: string | undefined) => {
        const newAfterWork = {
            recipientType: "callable" as WaldiezSwarmAfterWorkRecipientType,
            recipient: value ?? DEFAULT_CUSTOM_AFTER_WORK_RECIPIENT_METHOD_CONTENT,
        };
        setAfterWorkLocal(newAfterWork);
        onChange(newAfterWork);
    };
    return (
        <div className="margin-bottom-10">
            <InfoCheckbox
                label={"Include After Work"}
                info={
                    "After work handles conversation continuation when an agent doesn't select the next agent. " +
                    "If no agent is selected and no tool calls have output, we will use this property to determine the next action."
                }
                checked={enabled}
                dataTestId="afterWork"
                onChange={onEnabledChange}
            />
            {enabled && (
                <div className="margin-top-10">
                    <label htmlFor="afterWorkRecipientType">Recipient Type:</label>
                    <Select
                        options={recipientTypeOptions}
                        value={{
                            label: recipientToLabel[afterWorkLocal.recipientType],
                            value: afterWorkLocal.recipientType,
                        }}
                        onChange={onRecipientTypeChange}
                        inputId="afterWorkRecipientType"
                    />
                    <div className="margin-top-20" />
                    {afterWorkLocal.recipientType === "option" && (
                        <>
                            <label htmlFor="afterWorkOption">Recipient:</label>
                            <Select
                                options={afterWorkOptions}
                                value={
                                    isRecipientAnOption
                                        ? {
                                              label: optionToLabel[
                                                  afterWorkLocal.recipient as WaldiezSwarmAfterWorkOption
                                              ],
                                              value: afterWorkLocal.recipient as WaldiezSwarmAfterWorkOption,
                                          }
                                        : null
                                }
                                onChange={onAfterWorkOptionChange}
                                data-testid="afterWorkOption"
                            />
                        </>
                    )}
                    {afterWorkLocal.recipientType === "agent" && (
                        <>
                            <label htmlFor="afterWorkAgent">Recipient:</label>
                            <Select
                                options={agentOptions}
                                value={
                                    isRecipientAnAgent
                                        ? {
                                              label: agentOptionToLabel[afterWorkLocal.recipient as string],
                                              value: agentOptionToValue[afterWorkLocal.recipient as string],
                                          }
                                        : null
                                }
                                onChange={onAfterWorkAgentChange}
                                inputId="afterWorkAgent"
                            />
                        </>
                    )}
                    {afterWorkLocal.recipientType === "callable" && (
                        <div className="margin-top--10">
                            <label>
                                <div className="margin-top--10 margin-bottom--10">Recipient:</div>
                            </label>
                            <Editor
                                value={afterWorkLocal.recipient}
                                darkMode={darkMode}
                                onChange={onAfterWorkCallableChange}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export const DEFAULT_CUSTOM_AFTER_WORK_RECIPIENT_METHOD_CONTENT = `"""Custom after work recipient function."""
# provide the function to define the recipient of the after work property
# complete the \`custom_after_work\` below. Do not change the name or the arguments of the function.
# only complete the function body and the docstring and return the recipient.
# example:
# def custom_after_work(
#     last_speaker: SwarmAgent,
#     messages: List[Dict[str, Any]],
#     groupchat: GroupChat,
# ) -> Union[AfterWorkOption, SwarmAgent, str]:"
#     """Complete the custom after work recipient function"""
#     # return last_speaker
#     return "TERMINATE"
#
#
def custom_after_work(
    last_speaker: SwarmAgent,
    messages: List[Dict[str, Any]],
    groupchat: GroupChat,
) -> Union[AfterWorkOption, SwarmAgent, str]:"
    """Complete the custom after work recipient function"""
    ...
`;
