import { Edge, EdgeChange, Node, NodeChange, ReactFlowInstance, Viewport } from '@xyflow/react';

import { WaldieNodeType } from '@waldiez/models';
import { WaldieState } from '@waldiez/store';

export * from '@waldiez/components/flow/modal/types';

export type WaldieFlowProps = {
  flowId: string;
  storageId: string;
  monacoVsPath?: string | null;
  inputPrompt?: {
    previousMessages: string[];
    prompt: string;
  } | null;
  onRun?: ((flow: string) => void) | null;
  onChange?: ((content: string) => void) | null;
  onUserInput?: ((userInput: string) => void) | null;
  onUpload?: ((files: File[]) => Promise<string[]>) | null;
};

export type WaldieFlowViewProps = {
  flowId: string;
  storageId: string;
  darkMode: boolean;
  store: WaldieState & {
    rfInstance: ReactFlowInstance | null;
  };
  selectedNodeType: WaldieNodeType;
  includeRunButton: boolean;
  // flowModalVisible: boolean;
  inputPrompt?: {
    previousMessages: string[];
    prompt: string;
  } | null;
  isModalOpen: boolean;
  onEditFlow: () => void;
  onCloseModal: () => void;
  onThemeToggle: () => void;
  getFlow: (hideSecrets?: boolean) => {
    [key: string]: unknown;
  } | null;
  onImport: (contents: any) => void;
  // includeRunBtn: boolean;
  onUserInput?: ((userInput: string) => void) | null;
  // onCloseFlowModal: () => void;
  onNodeTypeSelected: (type: WaldieNodeType) => void;
  onModalSubmit: (data: {
    name: string;
    description: string;
    requirements: string[];
    tags: string[];
    orders: { id: string; order: number }[];
  }) => void;
  onFlowInit: (rfInstance: any) => void;
  onAddNode: () => void;
  onNodesChange: (changes: NodeChange<Node>[]) => void;
  onNodeDoubleClick: (event: React.MouseEvent, node: Node) => void;
  onEdgesChange: (changes: EdgeChange<Edge>[]) => void;
  onViewportChange: (viewport: Viewport) => void;
  onRun: () => void;
  onDrop: (event: any) => void;
  onDragOver: (event: any) => void;
  onkeydown: (event: any) => void;
};
