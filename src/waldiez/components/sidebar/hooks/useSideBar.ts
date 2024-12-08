import { useEffect, useState } from 'react';

import { SideBarProps } from '@waldiez/components/sidebar/types';
import { showSnackbar } from '@waldiez/components/snackbar';
import { useWaldiezContext } from '@waldiez/store';
import { downloadFile, getFlowRoot } from '@waldiez/utils';
import { isSidebarCollapsed, setSidebarCollapsed } from '@waldiez/utils/storage/sidebar';

export const useSideBar = (props: SideBarProps) => {
  const { rfInstance, typeShown, onTypeShownChange } = props;
  const getFlowInfo = useWaldiezContext(selector => selector.getFlowInfo);
  const flowId = useWaldiezContext(selector => selector.flowId);
  const storageId = useWaldiezContext(selector => selector.storageId ?? flowId);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSidebarCollapsed(storageId));
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const exportFlow = useWaldiezContext(selector => selector.exportFlow);
  useEffect(() => {
    const IsInitiallyCollapsed = isSidebarCollapsed(storageId);
    if (isCollapsed !== IsInitiallyCollapsed) {
      setIsCollapsed(IsInitiallyCollapsed);
    }
    setSidebarCollapsed(storageId, IsInitiallyCollapsed, true);
  }, []);
  const onToggle = () => {
    const rootDiv = getFlowRoot(flowId, true)!;
    const sidebar = rootDiv.querySelector('.sidebar') as HTMLElement;
    if (sidebar) {
      const viewport = rfInstance?.getViewport();
      rfInstance?.fitView({
        minZoom: viewport?.zoom,
        maxZoom: viewport?.zoom,
        includeHiddenNodes: true,
        padding: 0.2,
        duration: 100
      });
      setIsCollapsed(!isCollapsed);
      setSidebarCollapsed(storageId, !isCollapsed);
    }
  };
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string, agentType?: string) => {
    event.dataTransfer.setData('application/node', nodeType);
    if (nodeType === 'agent') {
      event.dataTransfer.setData('application/agent', agentType ?? 'user');
    }
    event.dataTransfer.effectAllowed = 'move';
  };
  const onShowAgents = () => {
    onTypeShownChange('agent');
  };
  const onShowModels = () => {
    onTypeShownChange('model');
  };
  const onShowSkills = () => {
    onTypeShownChange('skill');
  };
  const onUserDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    onDragStart(event, 'agent');
  };
  const onAssistantDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    onDragStart(event, 'agent', 'assistant');
  };
  const onManagerDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    onDragStart(event, 'agent', 'manager');
  };
  const onExport = (_e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const flow = exportFlow(true);
    const { name } = getFlowInfo();
    if (flow) {
      let fileName = name;
      if (fileName.length < 3) {
        fileName = 'flow';
      }
      if (fileName.length > 100) {
        fileName = fileName.substring(0, 100);
      }
      const blob = new Blob([JSON.stringify(flow)], {
        type: 'application/json'
      });
      downloadFile(blob, `${fileName}.waldiez`);
    } else {
      showSnackbar(flowId, 'Could not export flow', 'error', 3000);
    }
  };
  const onOpenEditModal = () => {
    setIsEditModalOpen(true);
  };
  const onCloseEditModal = () => {
    setIsEditModalOpen(false);
  };
  const onOpenImportModal = () => {
    setIsImportModalOpen(true);
  };
  const onCloseImportModal = () => {
    setIsImportModalOpen(false);
  };
  return {
    flowId,
    typeShown,
    isCollapsed,
    isEditModalOpen,
    isImportModalOpen,
    onToggle,
    onShowAgents,
    onShowModels,
    onShowSkills,
    onUserDragStart,
    onAssistantDragStart,
    onManagerDragStart,
    onExport,
    onOpenEditModal,
    onCloseEditModal,
    onOpenImportModal,
    onCloseImportModal
  };
};
