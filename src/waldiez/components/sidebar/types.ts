import { ReactFlowInstance } from '@xyflow/react';

import { WaldiezNodeType } from '@waldiez/models';

export type SideBarProps = {
  flowId: string;
  name: string;
  storageId: string;
  darkMode: boolean;
  rfInstance?: ReactFlowInstance;
  onThemeToggle: () => void;
  // setDarkMode: (darkMode: boolean) => void;
  getFlow: (hideSecrets?: boolean) => {
    [key: string]: unknown;
  } | null;
  onImport: (contents: any) => void;
  onNodeTypeSelected: (nodeType: WaldiezNodeType) => void;
  // setModalOpen: (open: boolean) => void;
  // onThemeToggle: () => void;
  onEditFlow: () => void;
  // onImportFlow: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // onExportFlow: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export type SideBarViewProps = {
  flowId: string;
  darkMode: boolean;
  isCollapsed: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onShowAgents: () => void;
  onShowModels: () => void;
  onShowSkills: () => void;
  onUserDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onAssistantDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onManagerDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onThemeToggle: () => void;
};
