import { showSnackbar } from '../snackbar';

import { useEffect, useState } from 'react';

import { SideBarProps } from '@waldiez/components/sidebar/types';
import { downloadFlow, getInitialSidebarState, storeSidebarState } from '@waldiez/components/sidebar/utils';
import { SideBarView } from '@waldiez/components/sidebar/view';

export const SideBar = (props: SideBarProps) => {
  const {
    rfInstance,
    flowId,
    storageId,
    darkMode,
    name,
    onThemeToggle,
    onImport,
    getFlow,
    onEditFlow,
    onNodeTypeSelected
  } = props;
  const [isCollapsed, setIsCollapsed] = useState<boolean>(getInitialSidebarState(storageId));
  useEffect(() => {
    setIsCollapsed(getInitialSidebarState(storageId));
  }, []);
  const onToggleSidebar = () => {
    const rootDiv = document.getElementById(`rf-root-${flowId}`);
    if (rootDiv) {
      const sidebar = document.querySelector('.sidebar') as HTMLElement;
      if (sidebar) {
        const viewport = rfInstance?.getViewport();
        rfInstance?.fitView({
          minZoom: viewport?.zoom,
          maxZoom: viewport?.zoom,
          includeHiddenNodes: true,
          padding: 10,
          duration: 100
        });
        setIsCollapsed(!isCollapsed);
        storeSidebarState(storageId, !isCollapsed);
      }
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
    onNodeTypeSelected('agent');
  };
  const onShowModels = () => {
    onNodeTypeSelected('model');
  };
  const onShowSkills = () => {
    onNodeTypeSelected('skill');
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
  const onImportFlow = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      showSnackbar(flowId, 'No file selected', 'error', 2000);
      return;
    }
    // limit the size
    if (file.size > 1024 * 1024 * 2) {
      showSnackbar(flowId, 'File size should be less than 2MB', 'error', 3000);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const fileContents = JSON.parse(reader.result as string);
        onImport(fileContents);
      } catch (error) {
        console.error(error);
        showSnackbar(flowId, 'Could not import flow', 'error', 3000);
      }
    };
    reader.readAsText(file);
  };
  const onExportFlow = (_e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const flow = getFlow(true);
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
      downloadFlow(blob, fileName);
    } else {
      showSnackbar(flowId, 'Could not export flow', 'error', 3000);
    }
  };
  return (
    <SideBarView
      flowId={flowId}
      darkMode={darkMode}
      isCollapsed={isCollapsed}
      onToggle={onToggleSidebar}
      onEdit={onEditFlow}
      onShowAgents={onShowAgents}
      onShowModels={onShowModels}
      onShowSkills={onShowSkills}
      onUserDragStart={onUserDragStart}
      onAssistantDragStart={onAssistantDragStart}
      onManagerDragStart={onManagerDragStart}
      onImport={onImportFlow}
      onExport={onExportFlow}
      onThemeToggle={onThemeToggle}
    />
  );
};
