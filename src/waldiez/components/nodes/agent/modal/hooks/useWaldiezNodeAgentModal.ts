import { Node } from "@xyflow/react";

import { useEffect, useState } from "react";

import {
    WaldiezAgentNestedChat,
    WaldiezAgentNodeData,
    WaldiezAgentNodeType,
    WaldiezNodeRagUserData,
    defaultRetrieveConfig,
} from "@waldiez/models";
import { useWaldiezContext } from "@waldiez/store";
import { isDarkMode } from "@waldiez/theme";
import { exportItem, importItem } from "@waldiez/utils";

export const useWaldiezNodeAgentModal = (
    id: string,
    isOpen: boolean,
    data: WaldiezAgentNodeData,
    onClose: () => void,
) => {
    const flowId = useWaldiezContext(selector => selector.flowId);
    const storageId = useWaldiezContext(selector => selector.storageId);
    const getAgentById = useWaldiezContext(selector => selector.getAgentById);
    const updateAgentData = useWaldiezContext(selector => selector.updateAgentData);
    const updateEdgeData = useWaldiezContext(selector => selector.updateEdgeData);
    const exportAgent = useWaldiezContext(selector => selector.exportAgent);
    const importAgent = useWaldiezContext(selector => selector.importAgent);
    const getAgentConnections = useWaldiezContext(selector => selector.getAgentConnections);
    const updateEdgePath = useWaldiezContext(selector => selector.updateEdgePath);
    const removeGroupMember = useWaldiezContext(selector => selector.removeGroupMember);
    const addGroupMember = useWaldiezContext(selector => selector.addGroupMember);
    const uploadHandler = useWaldiezContext(selector => selector.onUpload);
    const onFlowChanged = useWaldiezContext(selector => selector.onFlowChanged);
    const [agentData, setAgentData] = useState<WaldiezAgentNodeData>({ ...data });
    const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
    const isDark = isDarkMode(flowId, storageId ?? flowId);
    const [isDirty, setIsDirty] = useState(false);
    const updateDescriptionTextArea = (value: string) => {
        const agentDescriptionElement = document.getElementById(`flow-${flowId}-agent-description-${id}`);
        if (agentDescriptionElement) {
            (agentDescriptionElement as HTMLTextAreaElement).value = value;
        }
    };
    useEffect(() => {
        setAgentData({ ...data });
    }, [data, isOpen]);
    useEffect(() => {
        setIsDirty(false);
        setFilesToUpload([]);
    }, [isOpen]);
    const postSubmit = () => {
        const storedAgent = getAgentById(id);
        if (!storedAgent) {
            updateDescriptionTextArea(agentData.description);
            setIsDirty(false);
            return;
        }
        if (storedAgent.data) {
            setAgentData({ ...(storedAgent.data as WaldiezAgentNodeData) });
            setIsDirty(false);
        }
        updateDescriptionTextArea(storedAgent.data.description);
        onFlowChanged();
        // setNodeModalOpen(false);
    };
    const submit = (dataToSubmit: { [key: string]: any }) => {
        if (dataToSubmit.agentType !== data.agentType) {
            dataToSubmit = handleAgentTypeChange(dataToSubmit);
        }
        checkGroupChange(dataToSubmit);
        updateAgentData(id, dataToSubmit);
        if (data.label !== dataToSubmit.label) {
            updateAgentEdgeLabels();
        }
        setFilesToUpload([]);
        postSubmit();
    };
    const checkGroupChange = (dataToSubmit: { [key: string]: any }) => {
        const currentParentId = data.parentId;
        const newParentId = dataToSubmit.parentId;
        if (currentParentId !== newParentId) {
            if (currentParentId) {
                removeGroupMember(currentParentId, id);
            }
            if (newParentId) {
                addGroupMember(newParentId, id);
            }
        }
    };
    const updateAgentEdgeLabels = () => {
        // naming: "source" => "target"
        // depending on the 'agentConnections', update the edge labels
        const agentConnections = getAgentConnections(id, {
            sourcesOnly: false,
            targetsOnly: false,
            skipManagers: false,
        });
        const sourceEdges = agentConnections.source.edges;
        const targetEdges = agentConnections.target.edges;
        const newLabel = agentData.label;
        const oldLabel = data.label;
        sourceEdges.forEach(sourceEdge => {
            const toSearch = ` => ${oldLabel}`;
            const toReplace = ` => ${newLabel}`;
            const labelIndex = sourceEdge.data?.label.indexOf(toSearch);
            if (typeof labelIndex === "number" && labelIndex > -1) {
                const label = sourceEdge.data?.label.replace(toSearch, toReplace);
                updateEdgeData(sourceEdge.id, { ...sourceEdge.data, label });
            }
        });
        targetEdges.forEach(targetEdge => {
            const toSearch = `${oldLabel} => `;
            const toReplace = `${newLabel} => `;
            const labelIndex = targetEdge.data?.label.indexOf(toSearch);
            if (typeof labelIndex === "number" && labelIndex > -1) {
                const label = targetEdge.data?.label.replace(toSearch, toReplace);
                updateEdgeData(targetEdge.id, { ...targetEdge.data, label });
            }
        });
    };
    const submitRagUser = (dataToSubmit: { [key: string]: any }) => {
        if (filesToUpload.length > 0 && uploadHandler) {
            uploadHandler(filesToUpload)
                .then(filePaths => {
                    const ragData = agentData as WaldiezNodeRagUserData;
                    const docsPath = ragData.retrieveConfig.docsPath;
                    const newDocsPath = [...docsPath];
                    for (let i = 0; i < filesToUpload.length; i++) {
                        const index = newDocsPath.indexOf(`file:///${filesToUpload[i].name}`);
                        if (index > -1) {
                            if (typeof filePaths[i] === "string") {
                                newDocsPath[index] = filePaths[i];
                            } else {
                                newDocsPath.splice(index, 1);
                            }
                        }
                    }
                    dataToSubmit.retrieveConfig.docsPath = newDocsPath;
                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    const docsPath = dataToSubmit.retrieveConfig.docsPath;
                    dataToSubmit.retrieveConfig.docsPath = [...docsPath].filter(
                        (entry: any) =>
                            typeof entry === "string" && entry.length > 0 && !entry.startsWith("file:///"),
                    );
                    setFilesToUpload([]);
                    submit(dataToSubmit);
                });
        } else {
            // make sure no nulls in docsPath
            const ragData = agentData as WaldiezNodeRagUserData;
            const docsPath = ragData.retrieveConfig.docsPath;
            dataToSubmit.retrieveConfig.docsPath = docsPath.filter(
                entry => typeof entry === "string" && entry.length > 0 && !entry.startsWith("file:///"),
            );
            setFilesToUpload([]);
            submit(dataToSubmit);
        }
    };
    const onSave = () => {
        const dataToSubmit = { ...agentData } as { [key: string]: any };
        if (agentData.agentType === "rag_user") {
            submitRagUser(dataToSubmit);
        } else {
            submit(dataToSubmit);
        }
    };
    const updateAgentConnections = (newAgentType: WaldiezAgentNodeType) => {
        const agentConnections = getAgentConnections(id, {
            sourcesOnly: true,
        });
        agentConnections.target.edges.forEach(edge => {
            updateEdgePath(edge.id, newAgentType);
        });
    };
    const handleAgentTypeChange = (dataToSubmit: { [key: string]: any }) => {
        const newAgentType = dataToSubmit.agentType as WaldiezAgentNodeType;
        updateAgentConnections(newAgentType);
        if (newAgentType === "rag_user" && !dataToSubmit.retrieveConfig) {
            dataToSubmit.retrieveConfig = defaultRetrieveConfig;
        } else if (newAgentType === "user" && dataToSubmit.retrieveConfig) {
            delete dataToSubmit.retrieveConfig;
        }
        return dataToSubmit;
    };
    const onImportLoad = (agent: Node, jsonData: { [key: string]: unknown }) => {
        const newAgent = importAgent(jsonData, id, true, agent?.position);
        const dirty = JSON.stringify(newAgent.data) !== JSON.stringify(data);
        onDataChange({ ...newAgent.data });
        setIsDirty(dirty);
    };
    const onImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        importItem(event, getAgentById.bind(null, id), onImportLoad);
    };
    const onExport = () => {
        exportItem(agentData.label, "agent", exportAgent.bind(null, id, true));
    };
    const onCancel = () => {
        const storedAgent = getAgentById(id);
        if (!storedAgent) {
            setIsDirty(false);
            onClose();
            return;
        }
        if (storedAgent.data) {
            setAgentData({ ...(storedAgent.data as WaldiezAgentNodeData) });
        }
        setIsDirty(false);
        onClose();
    };
    const onDataChange = (partialData: Partial<WaldiezAgentNodeData>) => {
        let nestedChats: WaldiezAgentNestedChat[] = [];
        if (agentData.agentType !== "manager") {
            nestedChats = (partialData as any).nestedChats ?? agentData.nestedChats ?? [];
        }
        setAgentData({ ...agentData, ...partialData, nestedChats });
        const dirty = JSON.stringify({ ...agentData, ...partialData }) !== JSON.stringify(data);
        setIsDirty(dirty);
    };
    const toRagUser = () => {
        // make sure data.retrieveConfig (WaldiezRageUserRetrieveConfig) is set
        const ragData = agentData as { [key: string]: any };
        ragData.agentType = "rag_user";
        if (!ragData.retrieveConfig) {
            ragData.retrieveConfig = defaultRetrieveConfig;
        }
        ragData.retrieveConfig.docsPath = [];
        setAgentData({
            ...agentData,
            ...ragData,
        });
    };
    const toUser = () => {
        // remove retrieveConfig if it exists
        const noRagData = agentData as { [key: string]: any };
        noRagData.agentType = "user";
        if (noRagData.retrieveConfig) {
            delete noRagData.retrieveConfig;
        }
        setAgentData({
            ...agentData,
            ...noRagData,
        });
    };

    const onAgentTypeChange = (agentType: WaldiezAgentNodeType) => {
        // rag_user | user only
        if (agentType === "rag_user") {
            toRagUser();
        } else {
            toUser();
        }
        setIsDirty(data.agentType !== agentType);
    };
    const onFilesToUploadChange = (files: File[]) => {
        const dirty = JSON.stringify(files) !== JSON.stringify(filesToUpload);
        setFilesToUpload(files);
        setIsDirty(dirty);
    };
    return {
        flowId,
        filesToUpload,
        agentData,
        isDirty,
        isDarkMode: isDark,
        onDataChange,
        onAgentTypeChange,
        onFilesToUploadChange,
        onImport,
        onExport,
        onSave,
        onCancel,
    };
};
