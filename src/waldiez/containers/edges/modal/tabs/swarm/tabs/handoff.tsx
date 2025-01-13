import { Editor, InfoCheckbox, Select, SingleValue, TabItem, TabItems, TextInput } from "@waldiez/components";
import { WaldiezEdgeSwarmHandoffTabProps } from "@waldiez/containers/edges/modal/tabs/swarm/tabs/types";

export const WaldiezEdgeSwarmHandoffTab = (props: WaldiezEdgeSwarmHandoffTabProps) => {
    const { activeTabIndex, flowId, edgeId, data, darkMode, onDataChange } = props;
    const onConditionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onDataChange({ description: event.target.value });
    };
    const onConditionAvailableEnabledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        if (checked) {
            onDataChange({ message: { type: "string", content: "", context: {}, use_carryover: false } });
        } else {
            onDataChange({ message: { type: "none", content: "", context: {}, use_carryover: false } });
        }
    };
    const onConditionAvailableTypeChange = (
        option: SingleValue<{ label: string; value: "string" | "callable" }>,
    ) => {
        if (option) {
            const messageType = option.value === "callable" ? "method" : "string";
            const defaultContent =
                messageType === "method" ? DEFAULT_ON_CONDITION_AVAILABLE_METHOD_CONTENT : "";
            onDataChange({
                message: { type: messageType, content: defaultContent, context: {}, use_carryover: false },
            });
        }
    };
    const onConditionAvailableStringChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onDataChange({ message: { ...data.message, type: "string", content: event.target.value } });
    };
    const onConditionAvailableCallableChange = (value: string | undefined) => {
        onDataChange({
            message: {
                ...data.message,
                type: "method",
                content: value ?? DEFAULT_ON_CONDITION_AVAILABLE_METHOD_CONTENT,
            },
        });
    };
    return (
        <TabItems activeTabIndex={activeTabIndex}>
            <TabItem label="Handoff Condition" id={`we-${flowId}-edge-handoff-${edgeId}`}>
                <div className="modal-tab-body">
                    <div className="flex-column">
                        <label>Condition</label>
                        <textarea
                            rows={2}
                            defaultValue={data.description}
                            placeholder="Enter the condition"
                            onChange={onConditionChange}
                            data-testid={`edge-${edgeId}-condition-input`}
                        />
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
                                "If a variable, it will look up the value of the context variable with that name, which should be a bool."
                            }
                            checked={data.message.type !== "none"}
                            dataTestId="onConditionAvailable"
                            onChange={onConditionAvailableEnabledChange}
                        />
                    </div>
                    {data.message.type !== "none" && (
                        <div>
                            <label htmlFor={`wf-${flowId}-edge-handoff-${edgeId}-select-availability-check`}>
                                <div className="margin-top--10 margin-bottom--20">
                                    Availability Check Type:
                                </div>
                            </label>
                            <Select
                                options={[
                                    { label: "Variable", value: "string" as "string" | "callable" },
                                    { label: "Method", value: "callable" as "string" | "callable" },
                                ]}
                                value={{
                                    label: data.message.type === "method" ? "Method" : "Variable",
                                    value:
                                        data.message.type === "method"
                                            ? "callable"
                                            : ("string" as "string" | "callable"),
                                }}
                                onChange={onConditionAvailableTypeChange}
                                inputId={`wf-${flowId}-edge-handoff-${edgeId}-select-availability-check`}
                            />
                        </div>
                    )}
                    {data.message.type === "string" && (
                        <div className="margin-top-10">
                            <TextInput
                                label={"Variable to check:"}
                                value={data.message.content}
                                onChange={onConditionAvailableStringChange}
                                placeholder={"Enter a variable name"}
                                data-testid={`edge-${edgeId}-availability-input`}
                            />
                        </div>
                    )}
                    {data.message.type === "method" && (
                        <Editor
                            value={data.message.content ?? DEFAULT_ON_CONDITION_AVAILABLE_METHOD_CONTENT}
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
