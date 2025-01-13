import { TabItem, TabItems } from "@waldiez/components";
import { WaldiezEdgeSwarmTriggerTabProps } from "@waldiez/containers/edges/modal/tabs/swarm/tabs/types";

export const WaldiezEdgeSwarmTriggerTab = (props: WaldiezEdgeSwarmTriggerTabProps) => {
    const { activeTabIndex, edgeId, flowId, data: edgeData, onDataChange } = props;
    const onEnableTriggerMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        if (checked) {
            onDataChange({
                message: { content: "", type: "string", context: {}, use_carryover: false },
            });
        } else {
            onDataChange({
                message: { content: "", type: "none", context: {}, use_carryover: false },
            });
        }
    };
    const onMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onDataChange({
            message: { content: event.target.value, type: "string", context: {}, use_carryover: false },
        });
    };
    return (
        <TabItems activeTabIndex={activeTabIndex}>
            <TabItem label="Message" id={`we-${flowId}-edge-properties-${edgeId}`}>
                <div className="flex-column">
                    <label className="checkbox-label enable trigger message">
                        <div className="checkbox-label-view">Include initial message</div>
                        <input
                            type="checkbox"
                            checked={edgeData.message.type !== "none"}
                            onChange={onEnableTriggerMessageChange}
                            data-testid={`edge-${edgeId}-enable-trigger-message`}
                        />
                        <div className="checkbox"></div>
                    </label>
                    {edgeData.message.type !== "none" && (
                        <>
                            <label>Message</label>
                            <textarea
                                rows={2}
                                defaultValue={edgeData.message.content ?? ""}
                                placeholder="Enter the message to use when the swarm chat starts"
                                onChange={onMessageChange}
                                data-testid={`edge-${edgeId}-condition-input`}
                            />
                        </>
                    )}
                </div>
            </TabItem>
        </TabItems>
    );
};
