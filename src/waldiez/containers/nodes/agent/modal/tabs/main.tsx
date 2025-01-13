import { useEffect, useState } from "react";

import { TabItem, TabItems } from "@waldiez/components";
import { WaldiezAgentBasic } from "@waldiez/containers/nodes/agent/modal/tabs/basic";
import { WaldiezAgentCodeExecution } from "@waldiez/containers/nodes/agent/modal/tabs/codeExecution";
import { WaldiezAgentGroup } from "@waldiez/containers/nodes/agent/modal/tabs/group";
import { WaldiezAgentGroupManager } from "@waldiez/containers/nodes/agent/modal/tabs/groupManager";
import { WaldiezAgentModels } from "@waldiez/containers/nodes/agent/modal/tabs/models";
import { WaldiezAgentNestedChats } from "@waldiez/containers/nodes/agent/modal/tabs/nestedChats";
import { WaldiezAgentRagUser } from "@waldiez/containers/nodes/agent/modal/tabs/ragUser";
import { WaldiezAgentSkills } from "@waldiez/containers/nodes/agent/modal/tabs/skills";
import {
    WaldiezAgentSwarmFunctions,
    WaldiezAgentSwarmHandoffs,
} from "@waldiez/containers/nodes/agent/modal/tabs/swarm";
import { WaldiezAgentTermination } from "@waldiez/containers/nodes/agent/modal/tabs/termination";
import { WaldiezNodeAgentModalTabsProps } from "@waldiez/containers/nodes/agent/modal/tabs/types";
import {
    WaldiezNodeAgent,
    WaldiezNodeAgentData,
    WaldiezNodeAgentRagUserData,
    WaldiezNodeAgentSwarmData,
    WaldiezNodeModel,
    WaldiezNodeSkill,
} from "@waldiez/models";
import { useWaldiez } from "@waldiez/store";

export const WaldiezNodeAgentModalTabs = ({
    id,
    data,
    flowId,
    isModalOpen,
    isDarkMode,
    filesToUpload,
    onDataChange,
    onAgentTypeChange,
    onFilesToUploadChange,
}: WaldiezNodeAgentModalTabsProps) => {
    const isManager = data.agentType === "manager";
    const isRagUser = data.agentType === "rag_user";
    const isSwarm = data.agentType === "swarm";
    const getAgentConnections = useWaldiez(s => s.getAgentConnections);
    const getAgents = useWaldiez(s => s.getAgents);
    const getModels = useWaldiez(s => s.getModels);
    const getSkills = useWaldiez(s => s.getSkills);
    const uploadHandler = useWaldiez(s => s.onUpload);
    const agentConnections = getAgentConnections(id);
    const models = getModels() as WaldiezNodeModel[];
    const agents = getAgents() as WaldiezNodeAgent[];
    const skills = getSkills() as WaldiezNodeSkill[];
    const groupManagers = agents.filter(agent => agent.data.agentType === "manager");
    const connectionsCount = agentConnections.target.edges.length + agentConnections.source.edges.length;
    const showNestedChatsTab = !(isManager || connectionsCount === 0) && !isSwarm;
    const uploadsEnabled = !!uploadHandler;
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    useEffect(() => {
        setActiveTabIndex(0);
    }, [isModalOpen]);
    return (
        <TabItems activeTabIndex={activeTabIndex}>
            <TabItem label="Agent" id={`wf-${flowId}-agent-config-${id}`}>
                <div className="modal-tab-body">
                    <WaldiezAgentBasic
                        id={id}
                        data={data}
                        onDataChange={onDataChange}
                        onAgentTypeChange={onAgentTypeChange}
                    />
                </div>
            </TabItem>
            {isManager && (
                <TabItem label="Group Chat" id={`wf-${flowId}-agent-groupManager-${id}`}>
                    <div className="modal-tab-body">
                        <WaldiezAgentGroupManager
                            id={id}
                            flowId={flowId}
                            isDarkMode={isDarkMode}
                            data={data}
                            onDataChange={onDataChange}
                            agents={agents}
                            agentConnections={agentConnections}
                        />
                    </div>
                </TabItem>
            )}
            {isRagUser && (
                <TabItem label="RAG" id={`wf-${flowId}-agent-ragUser-${id}`}>
                    <div className="modal-tab-body">
                        <WaldiezAgentRagUser
                            id={id}
                            flowId={flowId}
                            isDarkMode={isDarkMode}
                            isModalOpen={isModalOpen}
                            uploadsEnabled={uploadsEnabled}
                            data={data as WaldiezNodeAgentRagUserData}
                            onDataChange={onDataChange}
                            filesToUpload={filesToUpload}
                            onFilesToUploadChange={onFilesToUploadChange}
                        />
                    </div>
                </TabItem>
            )}
            {!isManager && (
                <TabItem label="Termination" id={`wf-${flowId}-agent-termination-${id}`}>
                    <div className="modal-tab-body">
                        <WaldiezAgentTermination id={id} data={data} onDataChange={onDataChange} />
                    </div>
                </TabItem>
            )}
            {!isManager && (
                <TabItem label="Code Execution" id={`wf-${flowId}-agent-codeExecution-${id}`}>
                    <div className="modal-tab-body">
                        <WaldiezAgentCodeExecution
                            id={id}
                            data={data}
                            skills={skills}
                            onDataChange={onDataChange}
                        />
                    </div>
                </TabItem>
            )}
            <TabItem label="Models" id={`wf-${flowId}-agent-models-${id}`}>
                <div className="modal-tab-body">
                    <WaldiezAgentModels id={id} data={data} models={models} onDataChange={onDataChange} />
                </div>
            </TabItem>
            {!isManager && groupManagers.length > 0 && (
                <TabItem id={`wf-${flowId}-agent-group-${id}`} label="Group">
                    <div className="modal-tab-body">
                        <WaldiezAgentGroup id={id} data={data} agents={agents} onDataChange={onDataChange} />
                    </div>
                </TabItem>
            )}
            {!isManager && !isSwarm && (
                <TabItem label="Skills" id={`wf-${flowId}-agent-skills-${id}`}>
                    <div className="modal-tab-body">
                        <WaldiezAgentSkills
                            id={id}
                            data={data}
                            agents={agents}
                            skills={skills}
                            onDataChange={onDataChange}
                        />
                    </div>
                </TabItem>
            )}
            {isSwarm && (
                <TabItem label="Hand offs" id={`wf-${flowId}-agent-swarm-${id}`}>
                    <WaldiezAgentSwarmHandoffs
                        id={id}
                        data={data as WaldiezNodeAgentSwarmData}
                        agentConnections={agentConnections}
                        agents={agents}
                        onDataChange={onDataChange}
                    />
                </TabItem>
            )}
            {isSwarm && (
                <TabItem label="Functions" id={`wf-${flowId}-agent-swarm-${id}`}>
                    <WaldiezAgentSwarmFunctions
                        id={id}
                        data={data as WaldiezNodeAgentSwarmData}
                        skills={skills}
                        onDataChange={onDataChange}
                    />
                </TabItem>
            )}
            {showNestedChatsTab && (
                <TabItem label="Nested chats" id={`wf-${flowId}-agent-nestedChats-${id}`}>
                    <div className="modal-tab-body">
                        <WaldiezAgentNestedChats
                            id={id}
                            data={data as WaldiezNodeAgentData}
                            onDataChange={onDataChange}
                            agentConnections={agentConnections}
                        />
                    </div>
                </TabItem>
            )}
        </TabItems>
    );
};
