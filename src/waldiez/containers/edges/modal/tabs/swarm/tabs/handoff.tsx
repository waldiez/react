import { useState } from "react";

import { Editor, InfoCheckbox, Select, SingleValue, TabItem, TabItems, TextInput } from "@waldiez/components";
import { WaldiezEdgeSwarmHandoffTabProps } from "@waldiez/containers/edges/modal/tabs/swarm/tabs/types";
import { WaldiezSwarmOnConditionAvailableCheckType } from "@waldiez/types";

export const WaldiezEdgeSwarmHandoffTab = (props: WaldiezEdgeSwarmHandoffTabProps) => {
    const { activeTabIndex, flowId, edgeId, targetAgent, data, darkMode, onDataChange } = props;
    const [handoffType, setHandoffType] = useState<"on_condition" | "after_work">("on_condition");
    const onConditionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onDataChange({ description: event.target.value });
    };
    const onConditionAvailableEnabledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        if (checked) {
            onDataChange({ available: { type: "string", value: "" } });
        } else {
            onDataChange({ available: { type: "none", value: null } });
        }
    };
    const onConditionAvailableTypeChange = (
        option: SingleValue<{ label: string; value: WaldiezSwarmOnConditionAvailableCheckType }>,
    ) => {
        if (option) {
            const defaultContent =
                option.value === "callable" ? DEFAULT_ON_CONDITION_AVAILABLE_METHOD_CONTENT : "";
            onDataChange({
                available: {
                    type: option.value,
                    value: defaultContent,
                },
            });
        }
    };
    const onConditionAvailableStringChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onDataChange({
            available: {
                type: "string",
                value: event.target.value,
            },
        });
    };
    const onConditionAvailableCallableChange = (value: string | undefined) => {
        onDataChange({
            available: {
                type: "callable",
                value: value ?? DEFAULT_ON_CONDITION_AVAILABLE_METHOD_CONTENT,
            },
        });
    };
    const handoffTypeOptions: { label: string; value: "on_condition" | "after_work" }[] = [
        {
            label: "On Condition",
            value: "on_condition",
        },
        {
            label: "After work",
            value: "after_work",
        },
    ];
    const onHandoffTypeChange = (
        option: SingleValue<{ label: string; value: "on_condition" | "after_work" }>,
    ) => {
        if (option) {
            setHandoffType(option.value);
            if (option.value === "after_work") {
                onDataChange({
                    afterWork: {
                        recipientType: "agent",
                        recipient: targetAgent.data.label,
                    },
                    available: { type: "none", value: null },
                });
            } else {
                onDataChange({
                    afterWork: null,
                });
            }
        }
    };
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onDataChange({ label: event.target.value });
    };
    return (
        <TabItems activeTabIndex={activeTabIndex}>
            <TabItem label="Handoff" id={`we-${flowId}-edge-handoff-${edgeId}`}>
                <div className="modal-tab-body">
                    <div className="flex-column">
                        <TextInput
                            label="Label:"
                            value={data.label}
                            placeholder={`Transfer to ${targetAgent.data.label}`}
                            onChange={onNameChange}
                            data-testid={`edge-${edgeId}-description-input`}
                        />
                        <label>Handoff Type:</label>
                        <Select
                            options={handoffTypeOptions}
                            value={handoffTypeOptions.find(option => option.value === handoffType)}
                            onChange={onHandoffTypeChange}
                            inputId={`we-${flowId}-edge-handoff-${edgeId}-select-handoff-type`}
                        />
                        {handoffType === "on_condition" ? (
                            <div className="flex-column">
                                <label>Condition:</label>
                                <textarea
                                    rows={2}
                                    defaultValue={data.description}
                                    placeholder={`Transfer to ${targetAgent.data.label}`}
                                    onChange={onConditionChange}
                                    data-testid={`edge-${edgeId}-condition-input`}
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            </TabItem>
            <TabItem label="Availability" id={`we-${flowId}-edge-handoff-${edgeId}`}>
                <div className="modal-tab-body">
                    <div className="flex-column">
                        <InfoCheckbox
                            label={"Enable Availability Check"}
                            info={
                                "Optional condition to determine if this handoff is available. " +
                                "Can be a custom method or a variable name. " +
                                "If a variable, it will look up the value of the context variable with that name, which should be a bool." +
                                "If a method, it will call the method with the agent and the message as arguments and expect a boolean output."
                            }
                            checked={data.available.type !== "none"}
                            dataTestId="onConditionAvailable"
                            onChange={onConditionAvailableEnabledChange}
                        />
                    </div>
                    {data.available.type !== "none" && (
                        <div>
                            <label htmlFor={`wf-${flowId}-edge-handoff-${edgeId}-select-availability-check`}>
                                <div className="margin-top--10 margin-bottom--20">
                                    Availability Check Type:
                                </div>
                            </label>
                            <Select
                                options={[
                                    {
                                        label: "Variable",
                                        value: "string" as "string" | "callable",
                                    },
                                    {
                                        label: "Method",
                                        value: "callable" as "string" | "callable",
                                    },
                                ]}
                                value={{
                                    label: data.available.type === "string" ? "Variable" : "Method",
                                    value: data.available.type,
                                }}
                                onChange={onConditionAvailableTypeChange}
                                inputId={`wf-${flowId}-edge-handoff-${edgeId}-select-availability-check`}
                            />
                        </div>
                    )}
                    {data.available.type === "string" && (
                        <div className="margin-top-10">
                            <TextInput
                                label={"Variable to check:"}
                                value={data.available.value ?? ""}
                                onChange={onConditionAvailableStringChange}
                                placeholder={"Enter a variable name"}
                                data-testid={`edge-${edgeId}-availability-input`}
                            />
                        </div>
                    )}
                    {data.available.type === "callable" && (
                        <Editor
                            value={data.available.value ?? DEFAULT_ON_CONDITION_AVAILABLE_METHOD_CONTENT}
                            onChange={onConditionAvailableCallableChange}
                            darkMode={darkMode}
                        />
                    )}
                </div>
            </TabItem>
        </TabItems>
    );
};

export const DEFAULT_ON_CONDITION_AVAILABLE_METHOD_CONTENT = `"""Custom on condition availability check function."""
# provide the function to determine if the agent should be available
# complete the \`custom_on_condition_available\` below. Do not change the name or the arguments of the function.
# only complete the function body and the docstring and return a boolean.
# example:
#    def custom_on_condition_available(
#    agent: Agent,
#    message: Dict[str, Any],
# ) -> bool:
#    return message.get("agent_name", "") == agent.name
#
def custom_on_condition_available(
    agent: Agent,
    message: Dict[str, Any],
) -> bool:
    """Complete the on condition availability check function"""
    ...
`;
