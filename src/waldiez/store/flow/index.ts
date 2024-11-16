import { Edge, Node, Viewport } from '@xyflow/react';

import { nanoid } from 'nanoid';

import { WaldiezEdge, WaldiezNodeType } from '@waldiez/models';
import { EdgesStore } from '@waldiez/store/edges';
import { exportFlow } from '@waldiez/store/exporting';
import { loadFlow } from '@waldiez/store/importing';
import { reArrangeNodes, setViewPortTopLeft } from '@waldiez/store/nodes/common';
import { ModelsStore } from '@waldiez/store/nodes/models';
import { SkillsStore } from '@waldiez/store/nodes/skills';
import { ImportedFlow, ThingsToImport, typeOfGet, typeOfSet } from '@waldiez/store/types';

export class FlowStore {
  static updateFlow: (
    data: {
      name: string;
      description: string;
      tags: string[];
      requirements: string[];
    },
    set: typeOfSet
  ) => void = (data, set) => {
    set({
      name: data.name,
      description: data.description,
      tags: data.tags,
      requirements: data.requirements,
      updatedAt: new Date().toISOString()
    });
  };
  static updateFlowOrder: (data: { id: string; order: number }[], get: typeOfGet, set: typeOfSet) => void = (
    data,
    get,
    set
  ) => {
    const updatedAt = new Date().toISOString();
    set({
      edges: get().edges.map(edge => {
        const order = data.find(d => d.id === edge.id)?.order ?? edge.data?.order ?? -1;
        return {
          ...edge,
          data: { ...edge.data, order }
        };
      }),
      updatedAt
    });
  };
  static getFlowEdges: (get: typeOfGet) => [WaldiezEdge[], WaldiezEdge[]] = get => {
    const allEdges = get().edges.filter(edge => edge.type === 'chat') as WaldiezEdge[];
    const usedEdges = [] as WaldiezEdge[];
    const remainingEdges = [] as WaldiezEdge[];
    allEdges.forEach(edge => {
      let edgeOrder: number;
      if (typeof edge.data?.order === 'number') {
        edgeOrder = edge.data.order;
      } else {
        edgeOrder = -1;
      }
      if (edgeOrder >= 0) {
        usedEdges.push(edge);
      } else {
        remainingEdges.push(edge);
      }
    });
    const sortedEdgesUsed = usedEdges.sort((a, b) => (a.data?.order ?? 0) - (b.data?.order ?? 0));
    return [sortedEdgesUsed, remainingEdges];
  };
  static mergeTags: (currentTags: string[], newTags: string[]) => string[] = (currentTags, newTags) => {
    return Array.from(new Set([...currentTags, ...newTags]));
  };
  static mergeRequirements: (currentRequirements: string[], newRequirements: string[]) => string[] = (
    currentRequirements,
    newRequirements
  ) => {
    return Array.from(new Set([...currentRequirements, ...newRequirements]));
  };
  static mergeEdges: (currentNodes: Node[], currentEdges: Edge[], newEdges: Edge[]) => Edge[] = (
    currentNodes,
    currentEdges,
    newEdges
  ) => {
    const isEmpty = currentNodes.length === 0 && currentEdges.length === 0;
    if (isEmpty) {
      return newEdges.map(edge => {
        const animated = edge.type === 'nested';
        const hidden = edge.type === 'hidden';
        return { ...edge, animated, hidden };
      });
    }
    const unorderedEdges = newEdges.map(edge => {
      return { ...edge, data: { ...edge.data, order: -1 } } as Edge;
    });
    const nonDuplicateEdges = unorderedEdges.filter(
      edge => !currentEdges.find(currentEdge => currentEdge.id === edge.id)
    );
    return [...currentEdges, ...nonDuplicateEdges].map(edge => {
      const animated = edge.type === 'nested';
      const hidden = edge.type === 'hidden';
      return { ...edge, animated, hidden };
    });
  };
  static mergeNodes: (currentNodes: Node[], newNodes: Node[], typeShown: WaldiezNodeType) => Node[] = (
    currentNodes,
    newNodes,
    typeShown
  ) => {
    const nonDuplicateNodes = newNodes.filter(
      node => !currentNodes.find(currentNode => currentNode.id === node.id)
    );
    return [...currentNodes, ...nonDuplicateNodes].map(node => {
      if (node.type === typeShown) {
        return { ...node, hidden: false };
      }
      return { ...node, hidden: true };
    });
  };
  static mergeFlowName = (
    currentName: string,
    newName: string,
    currentNodes: Node[],
    currentEdges: Edge[]
  ) => {
    if (currentNodes.length === 0 && currentEdges.length === 0) {
      return newName;
    }
    return currentName;
  };
  static mergeFlowDescription = (
    currentDescription: string,
    newDescription: string,
    currentNodes: Node[],
    currentEdges: Edge[]
  ) => {
    if (currentNodes.length === 0 && currentEdges.length === 0) {
      return newDescription;
    }
    return currentDescription;
  };
  static importFlow: (
    items: ThingsToImport,
    flowData: ImportedFlow,
    typeShown: WaldiezNodeType,
    currentViewport: Viewport | undefined,
    get: typeOfGet,
    set: typeOfSet
  ) => void = (items, flowData, typeShown, currentViewport, get, set) => {
    const {
      storageId,
      name: currentName,
      description: currentDescription,
      tags: currentTags,
      requirements: currentRequirements,
      nodes: currentNodes,
      edges: currentEdges,
      rfInstance
    } = get();
    const currentFlow: ImportedFlow = {
      name: currentName,
      description: currentDescription,
      tags: currentTags,
      requirements: currentRequirements,
      nodes: currentNodes,
      edges: currentEdges
    };
    const { name, createdAt, description, tags, requirements, nodes, edges } = loadFlow(
      items,
      currentFlow,
      flowData,
      typeShown
    );
    const viewport = rfInstance?.getViewport() ?? currentViewport ?? { x: 0, y: 0, zoom: 1 };
    set({
      viewport,
      name,
      description,
      tags,
      requirements,
      storageId: storageId ?? `wf-${nanoid()}`,
      createdAt: createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      nodes,
      edges
    });
    EdgesStore.resetEdgePositions(get, set);
    ModelsStore.reArrangeModels(get, set);
    SkillsStore.reArrangeSkills(get, set);
    rfInstance?.fitView({
      minZoom: viewport?.zoom,
      maxZoom: viewport?.zoom,
      includeHiddenNodes: true,
      padding: 0.2,
      duration: 100
    });
  };
  static exportFlow: (hideSecrets: boolean, get: typeOfGet) => { [key: string]: unknown } = (
    hideSecrets,
    get
  ) => {
    let viewport = { x: 0, y: 0, zoom: 1 };
    const {
      name,
      description,
      tags,
      requirements,
      edges,
      nodes,
      createdAt,
      updatedAt,
      storageId,
      rfInstance
    } = get();
    if (rfInstance) {
      viewport = rfInstance.getViewport();
    }
    return exportFlow(
      { nodes, edges, viewport },
      {
        name,
        description,
        tags,
        requirements,
        storageId: storageId ?? `wf-${nanoid()}`,
        createdAt: createdAt ?? new Date().toISOString(),
        updatedAt: updatedAt ?? new Date().toISOString()
      },
      hideSecrets
    );
  };
  static onViewportChange(
    viewport: { x: number; y: number; zoom: number },
    nodeType: WaldiezNodeType,
    get: typeOfGet,
    set: typeOfSet
  ) {
    const zoomChanged = viewport.zoom !== get().viewport?.zoom;
    if (zoomChanged) {
      if (nodeType === 'model' || nodeType === 'skill') {
        const rfInstance = get().rfInstance;
        set({
          nodes: reArrangeNodes(get().nodes, get().flowId, nodeType, rfInstance),
          updatedAt: new Date().toISOString()
        });
        setTimeout(() => {
          setViewPortTopLeft(rfInstance);
          set({
            viewport: get().rfInstance?.getViewport()
          });
        }, 100);
      }
    } else {
      set({ viewport });
    }
  }
}
