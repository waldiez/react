import { Edge, EdgeChange, applyEdgeChanges } from '@xyflow/react';

import {
  WaldiezAgentNode,
  WaldiezAgentNodeType,
  WaldiezEdge,
  WaldiezNodeUserProxyOrAssistantData
} from '@waldiez/models';
import {
  edgeCommonStyle,
  getNewChatEdges,
  getNewEdge,
  getNewGroupEdges,
  getNewHiddenEdges,
  getNewNestedEdges
} from '@waldiez/store/edges/utils';
import { AGENT_COLORS } from '@waldiez/theme';
import { typeOfGet, typeOfSet } from '@waldiez/types';

export class EdgesStore {
  static onEdgesChange: (changes: EdgeChange[], get: typeOfGet, set: typeOfSet) => void = (
    changes,
    get,
    set
  ) => {
    const edges = applyEdgeChanges(changes, get().edges);
    set({
      edges,
      updatedAt: new Date().toISOString()
    });
  };
  static onEdgeDoubleClick: (flowId: string, edge: Edge) => void = (flowId, edge) => {
    const flowRoot = document.getElementById(`rf-root-${flowId}`);
    if (flowRoot) {
      const srcModalBtn = flowRoot.querySelector(`#open-edge-modal-node-${edge.source}`) as HTMLButtonElement;
      if (srcModalBtn) {
        srcModalBtn.setAttribute('data-edge-id', edge.id);
        srcModalBtn.click();
      } else {
        const dstModalBtn = flowRoot.querySelector(
          `#open-edge-modal-node-${edge.target}`
        ) as HTMLButtonElement;
        if (dstModalBtn) {
          dstModalBtn.setAttribute('data-edge-id', edge.id);
          dstModalBtn.click();
        }
      }
    }
  };
  static addEdge: (source: string, target: string, hidden: boolean, get: typeOfGet, set: typeOfSet) => Edge =
    (source, target, hidden, get, set) => {
      const nodes = get().nodes as WaldiezAgentNode[];
      const edgesCounter = (chatType: string) => get().edges.filter(edge => edge.type === chatType).length;
      const newEdge = getNewEdge(source, target, hidden, edgesCounter, nodes);
      set({
        edges: [
          ...get().edges,
          {
            ...newEdge
          }
        ],
        updatedAt: new Date().toISOString()
      });
      EdgesStore.resetEdgePositions(get, set);
      const newStoredEdge = get().edges.find(edge => edge.id === newEdge.id);
      return newStoredEdge ?? newEdge;
    };
  static getEdgeById: (edgeId: string, get: typeOfGet) => Edge | null = (edgeId, get) => {
    const edge = get().edges.find(edge => edge.id === edgeId);
    if (!edge) {
      return null;
    }
    return edge;
  };
  static getEdgeSourceAgent: (edge: Edge, get: typeOfGet) => WaldiezAgentNode | null = (edge, get) => {
    const sourceNode = get().nodes.find(node => node.id === edge.source);
    if (!sourceNode) {
      return null;
    }
    return sourceNode as WaldiezAgentNode;
  };
  static deleteEdge: (edgeId: string, get: typeOfGet, set: typeOfSet) => void = (edgeId, get, set) => {
    const agentNodes = get().nodes.filter(
      node => node.data.agentType === 'user' || node.data.agentType === 'assistant'
    );
    const newAgentNodes = agentNodes.map(agentNode => {
      const nestedChats = (agentNode.data as WaldiezNodeUserProxyOrAssistantData).nestedChats;
      return {
        ...agentNode,
        data: {
          ...agentNode.data,
          nestedChats: nestedChats.map(nestedChat => {
            return {
              ...nestedChat,
              messages: nestedChat.messages.filter(message => message.id !== edgeId),
              triggeredBy: nestedChat.triggeredBy.filter(connection => connection.id !== edgeId)
            };
          })
        }
      };
    });
    const notAgentNodes = get().nodes.filter(
      node => node.data.agentType !== 'user' && node.data.agentType !== 'assistant'
    );
    const nodes = [...newAgentNodes, ...notAgentNodes];
    const newEdges = get().edges.filter(edge => edge.id !== edgeId);
    set({
      nodes,
      edges: newEdges.map((edge, index) => {
        return {
          ...edge,
          data: { ...edge.data, position: index + 1 }
        };
      }),
      updatedAt: new Date().toISOString()
    });
    EdgesStore.resetEdgePositions(get, set);
  };
  static updateEdgeData: (edgeId: string, data: Edge['data'], get: typeOfGet, set: typeOfSet) => void = (
    edgeId,
    data,
    get,
    set
  ) => {
    set({
      edges: get().edges.map(edge => {
        if (edge.id === edgeId) {
          return { ...edge, data };
        }
        return edge;
      }),
      updatedAt: new Date().toISOString()
    });
    EdgesStore.resetEdgePositions(get, set);
  };
  static resetEdgePositions: (get: typeOfGet, set: typeOfSet) => void = (get, set) => {
    const edges = get().edges as WaldiezEdge[];
    const newEdges = edges.map(edge => {
      return {
        ...edge,
        data: { ...edge.data, position: 1 }
      };
    });
    const newChatEdges = getNewChatEdges(newEdges);
    const newNestedEdges = getNewNestedEdges(newEdges);
    const newGroupEdges = getNewGroupEdges(newEdges);
    const newHiddenEdges = getNewHiddenEdges(newEdges);
    set({
      edges: [...newChatEdges, ...newNestedEdges, ...newGroupEdges, ...newHiddenEdges],
      updatedAt: new Date().toISOString()
    });
    EdgesStore.updateNestedEdges(get, set);
  };
  static updateNestedEdges: (get: typeOfGet, set: typeOfSet) => void = (get, set) => {
    const agentNodes = get().nodes.filter(
      node => node.data.agentType === 'user' || node.data.agentType === 'assistant'
    );
    const nestedEdges: Edge[] = [];
    agentNodes.forEach(agentNode => {
      const nestedChats = (agentNode.data as WaldiezNodeUserProxyOrAssistantData).nestedChats;
      nestedChats.forEach(nestedChat => {
        const messages = nestedChat.messages;
        messages.forEach((message, index) => {
          const edge = get().edges.find(edge => edge.id === message.id);
          if (edge) {
            nestedEdges.push({
              ...edge,
              data: { ...edge.data, position: index + 1 }
            });
          }
        });
      });
    });
    const otherEdges = get().edges.filter(
      edge => nestedEdges.findIndex(nestedEdge => nestedEdge.id === edge.id) === -1
    );
    set({
      edges: [...otherEdges, ...nestedEdges],
      updatedAt: new Date().toISOString()
    });
  };
  static updateEdgeType: (
    edgeId: string,
    edgeType: 'chat' | 'nested' | 'group' | 'hidden',
    get: typeOfGet,
    set: typeOfSet
  ) => void = (edgeId, edgeType, get, set) => {
    set({
      edges: get().edges.map(edge => {
        if (edge.id === edgeId) {
          const sourceNode = get().nodes.find(node => node.id === edge.source);
          if (!sourceNode) {
            throw new Error(`Source node not found for edge ${edgeId}`);
          }
          const color = AGENT_COLORS[sourceNode.data.agentType as WaldiezAgentNodeType];
          return {
            ...edge,
            type: edgeType,
            hidden: false,
            order: -1,
            animated: edgeType === 'nested',
            ...edgeCommonStyle(color)
          };
        }
        return edge;
      }),
      updatedAt: new Date().toISOString()
    });
    EdgesStore.resetEdgePositions(get, set);
  };
  static updateEdgePath: (
    edgeId: string,
    agentType: WaldiezAgentNodeType,
    get: typeOfGet,
    set: typeOfSet
  ) => void = (edgeId, agentType, get, set) => {
    const color = AGENT_COLORS[agentType];
    const { style, markerEnd } = edgeCommonStyle(color);
    set({
      edges: get().edges.map(edge => {
        if (edge.id === edgeId) {
          return { ...edge, style, markerEnd };
        }
        return { ...edge };
      }),
      updatedAt: new Date().toISOString()
    });
  };
}
