import { useEffect, useState } from "react";

import { WaldiezEdgeNestedTab } from "@waldiez/containers/edges/modal/tabs/nested";
import {
    WaldiezEdgeSwarmHandoffTab,
    WaldiezEdgeSwarmTriggerTab,
} from "@waldiez/containers/edges/modal/tabs/swarm/tabs";
import { WaldiezEdgeSwarmTabsProps } from "@waldiez/containers/edges/modal/tabs/swarm/types";

// swarmType: "handoff" | "nested" | "source";

export const WaldiezEdgeSwarmTabs = (props: WaldiezEdgeSwarmTabsProps) => {
    const { isOpen, flowId, edgeId, sourceAgent, targetAgent, edgeData, darkMode, onDataChange } = props;
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    useEffect(() => {
        setActiveTabIndex(0);
    }, [isOpen]);
    const isHandoff = sourceAgent.data.agentType === "swarm" && targetAgent.data.agentType === "swarm";
    const isNested = sourceAgent?.data.agentType === "swarm" && targetAgent?.data.agentType !== "swarm";
    const isTrigger =
        sourceAgent.data.agentType !== "swarm" &&
        (targetAgent?.data.agentType === "swarm" || targetAgent.data.agentType === "swarm_container");
    return (
        <div className="modal-body edge-modal">
            {isTrigger && (
                <WaldiezEdgeSwarmTriggerTab
                    activeTabIndex={activeTabIndex}
                    flowId={flowId}
                    edgeId={edgeId}
                    data={edgeData}
                    onDataChange={onDataChange}
                />
            )}
            {isHandoff && (
                <WaldiezEdgeSwarmHandoffTab
                    activeTabIndex={activeTabIndex}
                    flowId={flowId}
                    edgeId={edgeId}
                    darkMode={darkMode}
                    data={edgeData}
                    onDataChange={onDataChange}
                />
            )}
            {isNested && (
                <WaldiezEdgeNestedTab
                    flowId={flowId}
                    edgeId={edgeId}
                    darkMode={darkMode}
                    data={edgeData}
                    onDataChange={onDataChange}
                />
            )}
        </div>
    );
};
