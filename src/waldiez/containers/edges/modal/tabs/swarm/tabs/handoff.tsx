import { useState } from "react";

import { OnConditionAvailable, Select, SingleValue, TabItem, TabItems, TextInput } from "@waldiez/components";
import { WaldiezEdgeSwarmHandoffTabProps } from "@waldiez/containers/edges/modal/tabs/swarm/tabs/types";
import { WaldiezSwarmOnConditionAvailable } from "@waldiez/types";

export const WaldiezEdgeSwarmHandoffTab = (props: WaldiezEdgeSwarmHandoffTabProps) => {
    const { activeTabIndex, flowId, edgeId, targetAgent, data, darkMode, onDataChange } = props;
    const [handoffType, setHandoffType] = useState<"on_condition" | "after_work">("on_condition");
    const onConditionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onDataChange({ description: event.target.value });
    };

    const handoffTypeOptions: { label: string; value: "on_condition" | "after_work" }[] = [
        {
            label: "On condition",
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
            setHandoffType(option.value);
        }
    };
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onDataChange({ label: event.target.value });
    };
    const onConditionAvailableChange = (available: WaldiezSwarmOnConditionAvailable) => {
        onDataChange({ available });
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
                            dataTestId={`edge-${edgeId}-description-input`}
                        />
                        <label htmlFor={`we-${flowId}-edge-handoff-${edgeId}-select-handoff-type`}>
                            Handoff Type:
                        </label>
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
            <TabItem label="Availability" id={`we-${flowId}-edge-availability-${edgeId}`}>
                <div className="modal-tab-body">
                    <OnConditionAvailable
                        data={data.available}
                        onDataChange={onConditionAvailableChange}
                        flowId={flowId}
                        darkMode={darkMode}
                    />
                </div>
            </TabItem>
        </TabItems>
    );
};
