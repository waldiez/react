import { Node } from '@xyflow/react';

import { useState } from 'react';

import { Modal } from '@waldiez/components/modal';
import { BasicAgentConfigTab } from '@waldiez/components/nodes/agent/modal/tabs/basic';
import { CodeExecutionAgentConfigTab } from '@waldiez/components/nodes/agent/modal/tabs/codeExecution';
import { GroupAgentConfigTab } from '@waldiez/components/nodes/agent/modal/tabs/group';
import { GroupManagerConfigNodeTab } from '@waldiez/components/nodes/agent/modal/tabs/groupManager';
import { ModelsAgentConfigTab } from '@waldiez/components/nodes/agent/modal/tabs/models';
import { NestedChatsAgentConfigTab } from '@waldiez/components/nodes/agent/modal/tabs/nestedChats';
import { RagUserAgentConfigTab } from '@waldiez/components/nodes/agent/modal/tabs/ragUser';
import { SkillsAgentConfigTab } from '@waldiez/components/nodes/agent/modal/tabs/skills';
import { TerminationAgentConfigTab } from '@waldiez/components/nodes/agent/modal/tabs/termination';
import { WaldiezNodeAgentModalProps } from '@waldiez/components/nodes/agent/modal/types';
import { exportItem, importItem } from '@waldiez/components/nodes/common';
import { getImportExportView } from '@waldiez/components/nodes/common';
import { TabItem, TabItems } from '@waldiez/components/tabs';
import {
  WaldiezNodeGroupManagerData,
  WaldiezNodeRagUserData,
  WaldiezNodeUserOrAssistantData
} from '@waldiez/models';
import { useWaldiezContext } from '@waldiez/store';

export const WaldiezNodeAgentModal = (props: WaldiezNodeAgentModalProps) => {
  const {
    flowId,
    id,
    data,
    models,
    skills,
    agents,
    isDarkMode,
    isDirty,
    canUploadFiles,
    isNodeModalOpen,
    currentGroupManager,
    agentConnections,
    onDataChange,
    setCurrentGroupManager,
    onAgentTypeChange,
    onCloseNodeModal,
    onCancel,
    onSave
  } = props;
  const isManager = data.agentType === 'manager';
  const isRagUser = data.agentType === 'rag_user';
  const getAgentById = useWaldiezContext(selector => selector.getAgentById);
  const exportAgent = useWaldiezContext(selector => selector.exportAgent);
  const importAgent = useWaldiezContext(selector => selector.importAgent);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const onSubmit = () => {
    onSave(filesToUpload);
  };
  const groupManagers = agents.filter(agent => agent.data.agentType === 'manager');
  const connectionsCount = agentConnections.target.edges.length + agentConnections.source.edges.length;
  const showNestedChatsTab = !isManager || connectionsCount === 0;
  const onImportLoad = (agent: Node, jsonData: { [key: string]: unknown }) => {
    const newAgent = importAgent(jsonData, id, true, agent?.position);
    onDataChange(newAgent.data, false);
    // Also check for type change?
  };
  const onImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    importItem(event, getAgentById.bind(null, id), onImportLoad);
  };
  const onExport = () => {
    exportItem(data.label, 'agent', exportAgent.bind(null, id, true));
  };
  const importExportView = getImportExportView(flowId, id, 'agent', onImport, onExport);
  return (
    <Modal
      title={data.label}
      isOpen={isNodeModalOpen}
      onClose={onCloseNodeModal}
      beforeTitle={importExportView}
      dataTestId={`wf-${flowId}-agent-modal-${id}`}
    >
      <div className="modal-body">
        <TabItems activeTabIndex={0}>
          <TabItem label="Agent" id={`wf-${flowId}-agent-config-${id}`}>
            <BasicAgentConfigTab
              id={id}
              data={data}
              onDataChange={onDataChange}
              onAgentTypeChange={onAgentTypeChange}
            />
          </TabItem>
          {isManager && (
            <TabItem label="Group Chat" id={`wf-${flowId}-agent-groupManager-${id}`}>
              <GroupManagerConfigNodeTab
                flowId={flowId}
                id={id}
                data={data as WaldiezNodeGroupManagerData}
                isDarkMode={isDarkMode}
                onDataChange={onDataChange}
                nodeConnections={agentConnections}
              />
            </TabItem>
          )}
          {isRagUser && (
            <TabItem label="RAG" id={`wf-${flowId}-agent-ragUser-${id}`}>
              <RagUserAgentConfigTab
                flowId={flowId}
                id={id}
                darkMode={isDarkMode}
                data={data as WaldiezNodeRagUserData}
                filesToUpload={filesToUpload}
                setFilesToUpload={setFilesToUpload}
                onDataChange={onDataChange}
                uploadEnabled={canUploadFiles}
              />
            </TabItem>
          )}
          {!isManager && (
            <TabItem label="Termination" id={`wf-${flowId}-agent-termination-${id}`}>
              <TerminationAgentConfigTab
                id={id}
                data={data}
                isDarkMode={isDarkMode}
                onDataChange={onDataChange}
              />
            </TabItem>
          )}
          {!isManager && (
            <TabItem label="Code Execution" id={`wf-${flowId}-agent-codeExecution-${id}`}>
              <CodeExecutionAgentConfigTab id={id} data={data} skills={skills} onDataChange={onDataChange} />
            </TabItem>
          )}
          <TabItem label="Models" id={`wf-${flowId}-agent-models-${id}`}>
            <ModelsAgentConfigTab id={id} models={models} data={data} onDataChange={onDataChange} />
          </TabItem>
          {!isManager && groupManagers.length > 0 && (
            <TabItem id={`wf-${flowId}-agent-group-${id}`} label="Group">
              <GroupAgentConfigTab
                id={id}
                data={data}
                agents={agents}
                onDataChange={onDataChange}
                currentGroupManager={currentGroupManager}
                setCurrentGroupManager={setCurrentGroupManager}
              />
            </TabItem>
          )}
          {!isManager && (
            <TabItem label="Skills" id={`wf-${flowId}-agent-skills-${id}`}>
              <SkillsAgentConfigTab
                id={id}
                skills={skills}
                agents={agents}
                data={data}
                onDataChange={onDataChange}
              />
            </TabItem>
          )}
          {showNestedChatsTab && (
            <TabItem label="Nested chats" id={`wf-${flowId}-agent-nestedChats-${id}`}>
              <NestedChatsAgentConfigTab
                id={id}
                data={data as WaldiezNodeUserOrAssistantData}
                onDataChange={onDataChange}
                agentConnections={agentConnections}
              />
            </TabItem>
          )}
        </TabItems>
        <div className="modal-actions">
          <button className="modal-action-cancel" onClick={onCancel} data-testid={`cancel-agent-data-${id}`}>
            Cancel
          </button>
          <button
            className="modal-action-submit"
            onClick={onSubmit}
            data-testid={`submit-agent-data-${id}`}
            disabled={!isDirty}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};
