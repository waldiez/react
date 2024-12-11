import { Edge, Node, Viewport } from '@xyflow/react';

export type WaldiezImportProps = {
  flowId?: string;
  storageId?: string;
  viewport?: Viewport;
  name: string;
  description: string;
  requirements: string[];
  createdAt?: string;
  updatedAt?: string;
  tags: string[];
  edges: Edge[];
  nodes: Node[];
};

export type ImportedFlow = {
  name: string;
  description: string;
  requirements: string[];
  createdAt?: string;
  updatedAt?: string;
  tags: string[];
  nodes: Node[];
  edges: Edge[];
};

export type ThingsToImport = {
  override: boolean;
  everything: boolean;
  name: boolean;
  description: boolean;
  tags: boolean;
  requirements: boolean;
  nodes: {
    models: Node[];
    skills: Node[];
    agents: Node[];
  };
  edges: Edge[];
};
