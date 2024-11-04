import { Connection, NodeProps } from '@xyflow/react';

import { useEffect, useState } from 'react';

import { WaldiezNodeAgentView } from '@waldiez/components/nodes/agent/view';
import {
  WaldiezAgentNode,
  WaldiezAgentNodeData,
  WaldiezAgentNodeType,
  WaldiezEdge,
  WaldiezModelNode,
  WaldiezNodeRagUserData,
  WaldiezNodeUserOrAssistantData,
  WaldiezSkillNode,
  defaultRetrieveConfig
} from '@waldiez/models';
import { useWaldiezContext } from '@waldiez/store';
import { isDarkMode } from '@waldiez/theme';

export const WaldiezNodeAgent = ({ id, data, parentId }: NodeProps<WaldiezAgentNode>) => {
  const updateAgentData = useWaldiezContext(s => s.updateAgentData);
  const addEdge = useWaldiezContext(s => s.addEdge);
  const cloneAgent = useWaldiezContext(s => s.cloneAgent);
  const getAgentById = useWaldiezContext(s => s.getAgentById);
  const getEdgeById = useWaldiezContext(s => s.getEdgeById);
  const uploadHandler = useWaldiezContext(s => s.onUpload);
  const deleteAgent = useWaldiezContext(s => s.deleteAgent);
  const getAgentConnections = useWaldiezContext(s => s.getAgentConnections);
  const removeGroupMember = useWaldiezContext(s => s.removeGroupMember);
  const addGroupMember = useWaldiezContext(s => s.addGroupMember);
  const changeGroup = useWaldiezContext(s => s.changeGroup);
  const updateEdgePath = useWaldiezContext(s => s.updateEdgePath);
  const reselectNode = useWaldiezContext(s => s.reselectNode);
  const getSkills = useWaldiezContext(s => s.getSkills);
  const getModels = useWaldiezContext(s => s.getModels);
  const getAgents = useWaldiezContext(s => s.getAgents);
  const flowId = useWaldiezContext(s => s.flowId);
  const storageId = useWaldiezContext(s => s.storageId);
  // tmp state, persist on submit, discard on cancel
  const [agentData, setAgentData] = useState<WaldiezAgentNodeData>({ ...data });
  const [isDirty, setIsDirty] = useState(false);
  const [isNodeModalOpen, setNodeModalOpen] = useState(false);
  const [isEdgeModalOpen, setEdgeModalOpen] = useState(false);
  const [edge, setEdge] = useState<WaldiezEdge | null>(null);
  const currentStoredGroupManager = parentId ? getAgentById(parentId) : null;
  const [currentGroupManager, setCurrentGroupManager] = useState<WaldiezAgentNode | null>(
    currentStoredGroupManager as WaldiezAgentNode
  );
  useEffect(() => {
    setCurrentGroupManager(parentId ? (getAgentById(parentId) as WaldiezAgentNode) : null);
  }, [parentId]);
  useEffect(() => {
    setAgentData({ ...data });
  }, [data]);
  const onOpenNodeModal = () => {
    if (!isEdgeModalOpen && !isNodeModalOpen) {
      setNodeModalOpen(true);
    }
  };
  const onOpenEdgeModal = (event: React.MouseEvent) => {
    if (!isNodeModalOpen && !isEdgeModalOpen) {
      const dataEdgeId = event.currentTarget.getAttribute('data-edge-id');
      if (dataEdgeId) {
        const existingEdge = getEdgeById(dataEdgeId);
        if (existingEdge) {
          setEdge(existingEdge as WaldiezEdge);
          setEdgeModalOpen(true);
        }
      }
    }
  };
  const onCloseEdgeModal = () => {
    setEdgeModalOpen(false);
    setEdge(null);
  };
  const onEdgeConnection = (connection: Connection) => {
    if (!isNodeModalOpen) {
      const newEdge = addEdge(connection.source, connection.target, false);
      setEdge(newEdge as WaldiezEdge);
      // setEdgeModalOpen(true);
    }
  };
  const setManagerState = (partialData: Partial<WaldiezAgentNodeData>) => {
    setAgentData({ ...agentData, ...partialData, nestedChats: [] });
    setIsDirty(JSON.stringify({ ...agentData, ...partialData }) !== JSON.stringify(data));
  };
  const setNoManagerState = (partialData: Partial<WaldiezAgentNodeData>) => {
    const newData = partialData as WaldiezNodeUserOrAssistantData;
    let nestedChats = (agentData as WaldiezNodeUserOrAssistantData).nestedChats;
    if (newData.nestedChats) {
      nestedChats = newData.nestedChats;
    }
    const dataToSet = { ...agentData, ...newData, nestedChats };
    setAgentData(dataToSet);
    setIsDirty(JSON.stringify(dataToSet) !== JSON.stringify(data));
  };

  const setAgentState = (partialData: Partial<WaldiezAgentNodeData>, persist: boolean = false) => {
    const isManager = agentData.agentType === 'manager';
    if (isManager) {
      setManagerState(partialData);
    } else {
      setNoManagerState(partialData);
    }
    if (persist === true) {
      updateAgentData(id, partialData);
      setIsDirty(false);
    }
  };
  const toRagUser = () => {
    // make sure data.retrieveConfig (WaldiezRageUserRetrieveConfig) is set
    const ragData = agentData as { [key: string]: any };
    ragData.agentType = 'rag_user';
    if (!ragData.retrieveConfig) {
      ragData.retrieveConfig = defaultRetrieveConfig;
    }
    setAgentData({
      ...agentData,
      ...ragData
    });
  };
  const toUser = () => {
    // remove retrieveConfig if it exists
    const noRagData = agentData as { [key: string]: any };
    noRagData.agentType = 'user';
    if (noRagData.retrieveConfig) {
      delete noRagData.retrieveConfig;
    }
    setAgentData({
      ...agentData,
      ...noRagData
    });
  };

  const onAgentTypeChange = (agentType: WaldiezAgentNodeType) => {
    // rag_user | user only
    if (agentType === 'rag_user') {
      toRagUser();
    } else {
      toUser();
    }
    setIsDirty(data.agentType !== agentType);
  };
  const onClone = () => {
    cloneAgent(id);
  };
  const onDelete = () => {
    deleteAgent(id);
  };
  const onCloseNodeModal = () => {
    setNodeModalOpen(false);
  };
  const updateAgentConnections = (newAgentType: WaldiezAgentNodeType) => {
    const agentConnections = getAgentConnections(id, {
      sourcesOnly: true
    });
    agentConnections.target.edges.forEach(edge => {
      updateEdgePath(edge.id, newAgentType);
    });
  };
  const handleAgentTypeChange = (dataToSubmit: { [key: string]: any }) => {
    const newAgentType = dataToSubmit.agentType as WaldiezAgentNodeType;
    updateAgentConnections(newAgentType);
    if (newAgentType === 'rag_user' && !dataToSubmit.retrieveConfig) {
      dataToSubmit.retrieveConfig = defaultRetrieveConfig;
    } else if (newAgentType === 'user' && dataToSubmit.retrieveConfig) {
      delete dataToSubmit.retrieveConfig;
    }
    return dataToSubmit;
  };
  const postSubmit = () => {
    const storedAgent = getAgentById(id);
    if (!storedAgent) {
      return;
    }
    if (storedAgent.data) {
      setAgentData({ ...(storedAgent.data as WaldiezAgentNodeData) });
      setIsDirty(false);
    }
    // setNodeModalOpen(false);
  };
  const submit = (dataToSubmit: { [key: string]: any }) => {
    if (dataToSubmit.agentType !== data.agentType) {
      dataToSubmit = handleAgentTypeChange(dataToSubmit);
    }
    updateAgentData(id, dataToSubmit);
    handleGroupChange();
    if (parentId) {
      reselectNode(parentId);
    } else if (currentGroupManager) {
      reselectNode(currentGroupManager.id);
    }
    // update the group state
    if (!parentId && currentGroupManager) {
      setCurrentGroupManager(getAgentById(currentGroupManager.id) as WaldiezAgentNode);
    } else if (!currentGroupManager) {
      setCurrentGroupManager(null);
    }
    postSubmit();
  };
  const handleGroupChange = () => {
    if (!parentId && currentGroupManager) {
      // join the group
      addGroupMember(currentGroupManager.id, id);
    } else if (parentId && !currentGroupManager) {
      // leave the group
      removeGroupMember(parentId, id);
    } else if (parentId && currentGroupManager && currentGroupManager.id !== parentId) {
      // change the group
      changeGroup(id, currentGroupManager.id);
    }
  };
  const onSave = (filesToUpload: File[]) => {
    const dataToSubmit = { ...agentData } as { [key: string]: any };
    if (agentData.agentType === 'rag_user' && filesToUpload.length > 0 && uploadHandler) {
      uploadHandler(filesToUpload).then(filePaths => {
        const ragData = agentData as WaldiezNodeRagUserData;
        const docsPath = ragData.retrieveConfig.docsPath;
        const newDocsPath = [...docsPath];
        for (let i = 0; i < filesToUpload.length; i++) {
          const index = newDocsPath.indexOf(`file:///${filesToUpload[i].name}`);
          if (index > -1) {
            newDocsPath[index] = filePaths[i];
          }
        }
        dataToSubmit.retrieveConfig.docsPath = newDocsPath;
        submit(dataToSubmit);
      });
    } else {
      submit(dataToSubmit);
    }
  };
  const onCancel = () => {
    const storedAgent = getAgentById(id);
    if (!storedAgent) {
      return;
    }
    if (storedAgent.data) {
      setAgentData({ ...(storedAgent.data as WaldiezAgentNodeData) });
    }
    setCurrentGroupManager(parentId ? (getAgentById(parentId) as WaldiezAgentNode) : null);
    setNodeModalOpen(false);
  };
  const skills = getSkills() as WaldiezSkillNode[];
  const models = getModels() as WaldiezModelNode[];
  const agents = getAgents() as WaldiezAgentNode[];
  const agentConnections = getAgentConnections(id);
  const isDark = isDarkMode(flowId, storageId ?? flowId);
  const uploadsEnabled = uploadHandler !== null;
  return (
    <WaldiezNodeAgentView
      id={id}
      flowId={flowId}
      data={agentData}
      isDirty={isDirty}
      skills={skills}
      models={models}
      agents={agents}
      agentConnections={agentConnections}
      uploadsEnabled={uploadsEnabled}
      parentId={parentId}
      edge={edge}
      isNodeModalOpen={isNodeModalOpen}
      isEdgeModalOpen={isEdgeModalOpen}
      isDarkMode={isDark}
      currentGroupManager={currentGroupManager}
      setCurrentGroupManager={setCurrentGroupManager}
      onDataChange={setAgentState}
      onOpenNodeModal={onOpenNodeModal}
      onOpenEdgeModal={onOpenEdgeModal}
      onCloseNodeModal={onCloseNodeModal}
      onCloseEdgeModal={onCloseEdgeModal}
      onEdgeConnection={onEdgeConnection}
      onAgentTypeChange={onAgentTypeChange}
      onClone={onClone}
      onDelete={onDelete}
      onSave={onSave}
      onCancel={onCancel}
    />
  );
};
