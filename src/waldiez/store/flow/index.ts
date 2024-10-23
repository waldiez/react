// import { ModelsStore, SkillsStore } from '../nodes';
import { nanoid } from 'nanoid';

import { WaldiezEdge, WaldiezNodeType } from '@waldiez/models';
import { EdgesStore } from '@waldiez/store/edges';
import { exportFlow } from '@waldiez/store/exporting';
import { importFlow } from '@waldiez/store/importing';
import { reArrangeNodes, setViewPortTopLeft } from '@waldiez/store/nodes/common';
import { typeOfGet, typeOfSet } from '@waldiez/store/types';

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
          data: { ...edge.data, order, updatedAt }
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
  static importFlow: (
    flow: unknown,
    createdAt: string,
    updatedAt: string,
    typeShown: WaldiezNodeType,
    get: typeOfGet,
    set: typeOfSet
  ) => void = (flow, createdAt, updatedAt, typeShown, get, set) => {
    const { nodes, edges, viewport, name, description, tags, requirements, storageId } = importFlow(flow);
    set({
      viewport,
      name,
      description,
      tags,
      requirements,
      storageId,
      createdAt,
      updatedAt,
      nodes: nodes.map(node => {
        if (node.type === typeShown) {
          return { ...node, hidden: false };
        }
        return { ...node, hidden: true };
      }),
      edges: edges.map(edge => {
        const animated = edge.type === 'nested';
        const hidden = edge.type === 'hidden';
        return { ...edge, animated, hidden };
      })
    });
    EdgesStore.resetEdgePositions(get, set);
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
  // static reArrangeNodes(get: typeOfGet, set: typeOfSet) {
  //     ModelsStore.reArrangeModels(get, set);
  //     return SkillsStore.reArrangeSkills(get, set);
  // }
}
