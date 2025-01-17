import { OnConditionAvailable, TextInput } from "@waldiez/components";
import { WaldiezAgentSwarmNestedChatConditionProps } from "@waldiez/containers/nodes/agent/modal/tabs/swarm/types";
import { WaldiezSwarmOnCondition, WaldiezSwarmOnConditionAvailable } from "@waldiez/types";

export const WaldiezAgentSwarmNestedChatCondition = (props: WaldiezAgentSwarmNestedChatConditionProps) => {
    const { flowId, data, darkMode, agentConnections, onDataChange } = props;
    const onConditionStringChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!data.nestedChats || data.nestedChats.length === 0) {
            const nestedChats = [
                {
                    triggeredBy: [event.target.value],
                    messages: [],
                },
            ];
            onDataChange({ nestedChats });
        } else {
            onDataChange({ nestedChats: [{ ...data.nestedChats[0], triggeredBy: [event.target.value] }] });
        }
    };
    let edgeId =
        data.nestedChats.length > 0 && data.nestedChats[0].messages.length > 0
            ? data.nestedChats[0].messages[0].id
            : null;
    if (!edgeId) {
        const nonSwarmTargets = agentConnections.target.nodes.filter(node => node.data.agentType !== "swarm");
        const nonSwarmTargetEdges = agentConnections.target.edges.filter(
            edge => edge.type === "swarm" && nonSwarmTargets.some(target => target.id === edge.target),
        );
        edgeId = nonSwarmTargetEdges[0].id;
    }
    const onConditionHandoffsNested = data.handoffs.filter(handoff => {
        if ("targetType" in handoff) {
            return handoff.targetType === "nested_chat";
        }
    });
    const onConditionAvailable: WaldiezSwarmOnConditionAvailable =
        onConditionHandoffsNested.length > 0
            ? (onConditionHandoffsNested[0] as WaldiezSwarmOnCondition).available
            : {
                  type: "none",
                  value: null,
              };

    const onCondition =
        data.nestedChats.length > 0 && data.nestedChats[0].triggeredBy.length > 0
            ? data.nestedChats[0].triggeredBy[0]
            : "";
    const onIsConditionAvailableChange = (onAvailableData: WaldiezSwarmOnConditionAvailable) => {
        const handoffs = structuredClone(data.handoffs);
        const onConditionHandoffIndex = handoffs.findIndex(handoff => {
            if ("targetType" in handoff) {
                return handoff.targetType === "nested_chat";
            }
        });
        if (onConditionHandoffIndex === -1) {
            handoffs.push({
                target: {
                    id: edgeId,
                    order: 0,
                },
                targetType: "nested_chat",
                available: onAvailableData,
                condition: onCondition,
            });
        } else {
            const currentOnCondition = handoffs[onConditionHandoffIndex] as WaldiezSwarmOnCondition;
            handoffs[onConditionHandoffIndex] = {
                ...currentOnCondition,
                available: onAvailableData,
            };
        }
        onDataChange({ handoffs });
    };
    return (
        <div className="agent-panel agent-swarm-nestedChats-condition-panel">
            <div className="modal-tab-body flex-column">
                <TextInput
                    value={onCondition}
                    onChange={onConditionStringChange}
                    placeholder="Condition for this handoff..."
                    label={"Condition:"}
                />
                {edgeId && (
                    <OnConditionAvailable
                        data={onConditionAvailable}
                        flowId={flowId}
                        edgeId={edgeId}
                        darkMode={darkMode}
                        onDataChange={onIsConditionAvailableChange}
                    />
                )}
            </div>
        </div>
    );
};
