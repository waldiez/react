import { Connection, NodeProps } from '@xyflow/react';

import { useEffect, useState } from 'react';

import { WaldieNodeAgentView } from '@waldiez/components/nodes/agent/view';
import {
  WaldieAgentNode,
  WaldieAgentNodeData,
  WaldieAgentNodeType,
  WaldieEdge,
  WaldieModelNode,
  WaldieNodeRagUserData,
  WaldieNodeUserOrAssistantData,
  WaldieSkillNode,
  defaultRetrieveConfig
} from '@waldiez/models';
import { useWaldieContext } from '@waldiez/store';
import { isDarkMode } from '@waldiez/theme';

export const WaldieNodeAgent = ({ id, data, parentId }: NodeProps<WaldieAgentNode>) => {
  const updateAgentData = useWaldieContext(s => s.updateAgentData);
  const addEdge = useWaldieContext(s => s.addEdge);
  const cloneAgent = useWaldieContext(s => s.cloneAgent);
  const getAgentById = useWaldieContext(s => s.getAgentById);
  const getEdgeById = useWaldieContext(s => s.getEdgeById);
  const uploadHandler = useWaldieContext(s => s.onUpload);
  const deleteAgent = useWaldieContext(s => s.deleteAgent);
  const getAgentConnections = useWaldieContext(s => s.getAgentConnections);
  const removeGroupMember = useWaldieContext(s => s.removeGroupMember);
  const addGroupMember = useWaldieContext(s => s.addGroupMember);
  const changeGroup = useWaldieContext(s => s.changeGroup);
  const updateEdgePath = useWaldieContext(s => s.updateEdgePath);
  const reselectNode = useWaldieContext(s => s.reselectNode);
  const getSkills = useWaldieContext(s => s.getSkills);
  const getModels = useWaldieContext(s => s.getModels);
  const getAgents = useWaldieContext(s => s.getAgents);
  const flowId = useWaldieContext(s => s.flowId);
  const storageId = useWaldieContext(s => s.storageId);
  // tmp state, persist on submit, discard on cancel
  const [agentData, setAgentData] = useState<WaldieAgentNodeData>({
    ...data
  });
  const [isNodeModalOpen, setNodeModalOpen] = useState(false);
  const [isEdgeModalOpen, setEdgeModalOpen] = useState(false);
  const [edge, setEdge] = useState<WaldieEdge | null>(null);
  const currentStoredGroupManager = parentId ? getAgentById(parentId) : null;
  const [currentGroupManager, setCurrentGroupManager] = useState<WaldieAgentNode | null>(
    currentStoredGroupManager as WaldieAgentNode
  );
  useEffect(() => {
    setCurrentGroupManager(parentId ? (getAgentById(parentId) as WaldieAgentNode) : null);
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
          setEdge(existingEdge as WaldieEdge);
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
      setEdge(newEdge as WaldieEdge);
      // setEdgeModalOpen(true);
    }
  };
  const setManagerState = (partialData: Partial<WaldieAgentNodeData>) => {
    setAgentData({ ...agentData, ...partialData, nestedChats: [] });
  };
  const setNoManagerState = (partialData: Partial<WaldieAgentNodeData>) => {
    const newData = partialData as WaldieNodeUserOrAssistantData;
    let nestedChats = (agentData as WaldieNodeUserOrAssistantData).nestedChats;
    if (newData.nestedChats) {
      nestedChats = newData.nestedChats;
    }
    setAgentData({ ...agentData, ...newData, nestedChats });
  };

  const setAgentState = (partialData: Partial<WaldieAgentNodeData>, persist: boolean = false) => {
    const isManager = agentData.agentType === 'manager';
    if (isManager) {
      setManagerState(partialData);
    } else {
      setNoManagerState(partialData);
    }
    if (persist === true) {
      updateAgentData(id, partialData);
    }
  };
  const toRagUser = () => {
    // make sure data.retrieveConfig (WaldieRageUserRetrieveConfig) is set
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

  const onAgentTypeChange = (agentType: WaldieAgentNodeType) => {
    // rag_user | user only
    if (agentType === 'rag_user') {
      toRagUser();
    } else {
      toUser();
    }
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
  const updateAgentConnections = (newAgentType: WaldieAgentNodeType) => {
    const agentConnections = getAgentConnections(id, {
      sourcesOnly: true
    });
    agentConnections.target.edges.forEach(edge => {
      updateEdgePath(edge.id, newAgentType);
    });
  };
  const onChangeToRagUser = (currentAgentData: WaldieAgentNodeData) => {
    // make sure data.retrieveConfig (WaldieRageUserRetrieveConfig) is set
    const ragData = currentAgentData as { [key: string]: any };
    ragData.agentType = 'rag_user';
    if (!ragData.retrieveConfig) {
      ragData.retrieveConfig = defaultRetrieveConfig;
    }
  };
  const onChangeToNoRagUser = (currentAgentData: WaldieAgentNodeData) => {
    // remove retrieveConfig if it exists
    const noRagData = currentAgentData as { [key: string]: any };
    noRagData.agentType = 'user';
    if (noRagData.retrieveConfig) {
      delete noRagData.retrieveConfig;
    }
  };
  const handleAgentTypeChange = (newAgentType: WaldieAgentNodeType) => {
    const agent = getAgentById(id);
    if (!agent) {
      return;
    }
    updateAgentConnections(newAgentType);
    const currentAgentData = agent.data as WaldieAgentNodeData;
    if (newAgentType === 'rag_user') {
      onChangeToRagUser(currentAgentData);
    } else {
      onChangeToNoRagUser(currentAgentData);
    }
  };
  const postSubmit = () => {
    const storedAgent = getAgentById(id);
    if (!storedAgent) {
      return;
    }
    if (storedAgent.data) {
      setAgentData({ ...(storedAgent.data as WaldieAgentNodeData) });
    }
    setNodeModalOpen(false);
  };
  const doSubmit = (dataToSubmit: { [key: string]: any }) => {
    if (dataToSubmit.agentType !== data.agentType) {
      handleAgentTypeChange(dataToSubmit.agentType);
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
      setCurrentGroupManager(getAgentById(currentGroupManager.id) as WaldieAgentNode);
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
  const onSubmit = (filesToUpload: File[]) => {
    const dataToSubmit = { ...agentData } as { [key: string]: any };
    if (agentData.agentType === 'rag_user' && filesToUpload.length > 0 && uploadHandler) {
      uploadHandler(filesToUpload).then(filePaths => {
        const ragData = agentData as WaldieNodeRagUserData;
        const docsPath = ragData.retrieveConfig.docsPath;
        const newDocsPath = [...docsPath];
        for (let i = 0; i < filesToUpload.length; i++) {
          const index = newDocsPath.indexOf(`file:///${filesToUpload[i].name}`);
          if (index > -1) {
            newDocsPath[index] = filePaths[i];
          }
        }
        dataToSubmit.retrieveConfig.docsPath = newDocsPath;
        doSubmit(dataToSubmit);
      });
    } else {
      doSubmit(dataToSubmit);
    }
  };
  const onCancel = () => {
    const storedAgent = getAgentById(id);
    if (!storedAgent) {
      return;
    }
    if (storedAgent.data) {
      setAgentData({ ...(storedAgent.data as WaldieAgentNodeData) });
    }
    setCurrentGroupManager(parentId ? (getAgentById(parentId) as WaldieAgentNode) : null);
    setNodeModalOpen(false);
  };
  const skills = getSkills() as WaldieSkillNode[];
  const models = getModels() as WaldieModelNode[];
  const agents = getAgents() as WaldieAgentNode[];
  const agentConnections = getAgentConnections(id);
  const isDark = isDarkMode(flowId, storageId ?? flowId);
  const uploadsEnabled = uploadHandler !== null;
  return (
    <WaldieNodeAgentView
      id={id}
      flowId={flowId}
      data={agentData}
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
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};
