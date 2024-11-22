import { Edge } from '@xyflow/react';

import {
  WaldiezAgentNode,
  WaldiezAgentNodeData,
  WaldiezAgentNodeType,
  WaldiezEdge,
  WaldiezSourceEdge,
  WaldiezSourceEdgeData
} from '@waldiez/models';
import { EdgesStore } from '@waldiez/store/edges';
import { exportAgent } from '@waldiez/store/exporting';
import { importAgent } from '@waldiez/store/importing';
import { getAgentNode } from '@waldiez/store/nodes/agents/utils';
import { typeOfGet, typeOfSet } from '@waldiez/store/types';
import { getId } from '@waldiez/utils';

export class AgentsStore {
  static getAgents: (get: typeOfGet) => WaldiezAgentNode[] = get => {
    return get().nodes.filter(node => node.type === 'agent') as WaldiezAgentNode[];
  };
  static addAgent: (
    agentType: WaldiezAgentNodeType,
    position: { x: number; y: number },
    get: typeOfGet,
    set: typeOfSet,
    parentId?: string
  ) => WaldiezAgentNode = (agentType, position, get, set, parentId) => {
    const newNode = getAgentNode(agentType, position) as WaldiezAgentNode;
    if (parentId) {
      newNode.data.parentId = parentId;
    }
    set({
      nodes: [
        ...get().nodes,
        {
          ...newNode
        }
      ],
      updatedAt: new Date().toISOString()
    });
    return newNode as WaldiezAgentNode;
  };
  static getAgentById: (agentId: string, get: typeOfGet) => WaldiezAgentNode | null = (agentId, get) => {
    const agent = get().nodes.find(node => node.id === agentId && node.type === 'agent');
    if (!agent) {
      return null;
    }
    return agent as WaldiezAgentNode;
  };
  static cloneAgent: (agentId: string, get: typeOfGet, set: typeOfSet) => WaldiezAgentNode = (
    agentId,
    get,
    set
  ) => {
    const agent = get().nodes.find(node => node.id === agentId);
    if (!agent) {
      throw new Error(`Agent with id ${agentId} not found`);
    }
    const newNode = {
      id: `wa-${getId()}`,
      data: { ...agent.data, label: `${agent.data.label} (copy)` },
      position: {
        x: agent.position.x + (agent.width ?? 100) + 40,
        y: agent.position.y + (agent.height ?? 100) + 40
      }
    } as WaldiezAgentNode;
    set({
      nodes: [...get().nodes, { ...newNode, type: 'agent', selected: false }],
      updatedAt: new Date().toISOString()
    });
    // select the new node
    setTimeout(() => {
      set({
        nodes: get().nodes.map(node => {
          if (node.id === newNode.id) {
            return { ...node, selected: true };
          }
          return { ...node, selected: false };
        })
      });
    }, 10);
    return newNode;
  };
  static updateAgentData: (
    agentId: string,
    data: Partial<WaldiezAgentNodeData>,
    get: typeOfGet,
    set: typeOfSet
  ) => void = (agentId, data, get, set) => {
    const updatedAt = new Date().toISOString();
    set({
      nodes: [
        ...get().nodes.map(node => {
          if (node.id === agentId) {
            return {
              ...node,
              data: { ...node.data, ...data, updatedAt }
            };
          }
          return node;
        })
      ],
      updatedAt
    });
    EdgesStore.resetEdgePositions(get, set);
    EdgesStore.resetEdgeOrders(get, set);
  };
  static deleteAgent: (agentId: string, get: typeOfGet, set: typeOfSet) => void = (agentId, get, set) => {
    // if the agent is a group manager, remove the members' parentId
    const agent = get().nodes.find(node => node.id === agentId);
    if (agent && agent.data.agentType === 'manager') {
      const groupMembers = get().nodes.filter(
        node => node.type === 'agent' && node.data.parentId === agentId
      );
      set({
        nodes: get().nodes.map(node => {
          if (groupMembers.some(member => member.id === node.id)) {
            return {
              ...node,
              data: { ...node.data, parentId: null }
            };
          }
          return node;
        }),
        updatedAt: new Date().toISOString()
      });
      set({
        nodes: get().nodes.filter(node => node.id !== agentId),
        edges: get().edges.filter(edge => edge.source !== agentId && edge.target !== agentId),
        updatedAt: new Date().toISOString()
      });
    } else {
      set({
        nodes: get().nodes.filter(node => node.id !== agentId),
        edges: get().edges.filter(edge => edge.source !== agentId && edge.target !== agentId),
        updatedAt: new Date().toISOString()
      });
    }
    EdgesStore.resetEdgePositions(get, set);
    EdgesStore.resetEdgeOrders(get, set);
  };
  static getEdgeSourceAgent = (get: typeOfGet, edge: Edge, skipManagers: boolean = false) => {
    const sourceNode = get().nodes.find(node => {
      if (node.id !== edge.source) {
        return false;
      }
      if (skipManagers) {
        return (node as WaldiezAgentNode).data.agentType !== 'manager';
      }
      return true;
    });
    return sourceNode as WaldiezAgentNode | undefined;
  };
  static getEdgeTargetAgent = (get: typeOfGet, edge: Edge, skipManagers: boolean = false) => {
    const targetNode = get().nodes.find(node => {
      if (node.id !== edge.target) {
        return false;
      }
      if (skipManagers) {
        return (node as WaldiezAgentNode).data.agentType !== 'manager';
      }
      return true;
    });
    return targetNode as WaldiezAgentNode | undefined;
  };
  static getAgentEdgeConnections = (
    nodeId: string,
    edge: Edge,
    get: typeOfGet,
    targetsOnly?: boolean,
    sourcesOnly?: boolean,
    skipManagers: boolean = false
  ) => {
    let targetNode;
    if (edge.source === nodeId && !targetsOnly) {
      targetNode = AgentsStore.getEdgeTargetAgent(get, edge, skipManagers);
    }
    let sourceNode;
    if (edge.target === nodeId && !sourcesOnly) {
      sourceNode = AgentsStore.getEdgeSourceAgent(get, edge, skipManagers);
    }
    return { sourceNode, targetNode };
  };
  static getAgentConnections: (
    nodeId: string,
    get: typeOfGet,
    options: {
      sourcesOnly?: boolean;
      targetsOnly?: boolean;
      skipManagers?: boolean;
    }
  ) => {
    source: {
      nodes: WaldiezAgentNode[];
      edges: WaldiezEdge[];
    };
    target: {
      nodes: WaldiezAgentNode[];
      edges: WaldiezEdge[];
    };
  } = (nodeId, get, options) => {
    const { sourcesOnly, targetsOnly, skipManagers } = options;
    const sourceConnectedNodes = [];
    const sourceConnectionEdges = [];
    const targetConnectedNodes = [];
    const targetConnectionEdges = [];
    for (const edge of get().edges) {
      const { sourceNode, targetNode } = AgentsStore.getAgentEdgeConnections(
        nodeId,
        edge,
        get,
        targetsOnly,
        sourcesOnly,
        skipManagers
      );
      if (sourceNode) {
        sourceConnectedNodes.push(sourceNode);
        sourceConnectionEdges.push(edge);
      }
      if (targetNode) {
        targetConnectedNodes.push(targetNode);
        targetConnectionEdges.push(edge);
      }
    }
    return {
      source: {
        nodes: sourceConnectedNodes as WaldiezAgentNode[],
        edges: sourceConnectionEdges as WaldiezEdge[]
      },
      target: {
        nodes: targetConnectedNodes as WaldiezAgentNode[],
        edges: targetConnectionEdges as WaldiezEdge[]
      }
    };
  };
  static getGroupMembers: (groupId: string, get: typeOfGet) => WaldiezAgentNode[] = (groupId, get) => {
    return get().nodes.filter(
      node => node.type === 'agent' && node.data.parentId === groupId
    ) as WaldiezAgentNode[];
  };
  static addGroupMember: (groupId: string, memberId: string, get: typeOfGet, set: typeOfSet) => void = (
    groupId,
    memberId,
    get,
    set
  ) => {
    // add an edge with source the parent and target the member
    const newEdge = new WaldiezSourceEdge({
      id: `we-${getId()}`,
      source: groupId,
      target: memberId,
      data: new WaldiezSourceEdgeData(groupId, memberId),
      rest: {}
    }).asEdge();
    const innerEdge: Edge = { ...newEdge, type: 'hidden', selected: false };
    // remove any other edges that the member currently has with other nodes
    const remainingEdges = get().edges.filter(edge => edge.source !== memberId && edge.target !== memberId);
    set({
      nodes: get().nodes.map(node => {
        if (node.id === memberId) {
          return { ...node, data: { ...node.data, parentId: groupId } };
        }
        return node;
      }),
      edges: [...remainingEdges, ...[innerEdge]],
      updatedAt: new Date().toISOString()
    });
    EdgesStore.resetEdgePositions(get, set);
    EdgesStore.resetEdgeOrders(get, set);
  };
  static removeGroupMember: (groupId: string, memberId: string, get: typeOfGet, set: typeOfSet) => void = (
    groupId,
    memberId,
    get,
    set
  ) => {
    const nodes = [
      ...get().nodes.map(node => {
        if (node.id === memberId && node.data.parentId === groupId) {
          node.data.parentId = null;
          node.position = {
            x: node.position.x + 50,
            y: node.position.y + 50
          };
        }
        return { ...node };
      })
    ];
    const edges = get().edges.filter(edge => !(edge.source === groupId && edge.target === memberId));
    set({
      nodes,
      edges,
      updatedAt: new Date().toISOString()
    });
    EdgesStore.resetEdgePositions(get, set);
    EdgesStore.resetEdgeOrders(get, set);
  };
  static setAgentGroup: (
    agentId: string,
    groupId: string | undefined,
    get: typeOfGet,
    set: typeOfSet
  ) => void = (agentId, groupId, get, set) => {
    set({
      nodes: get().nodes.map(node => {
        if (node.id === agentId) {
          return {
            ...node,
            data: {
              ...node.data,
              parentId: groupId
            }
          };
        }
        return node;
      }),
      updatedAt: new Date().toISOString()
    });
  };
  static changeGroup(agentId: string, newGroupId: string | undefined, get: typeOfGet, set: typeOfSet) {
    const agent = get().nodes.find(node => node.id === agentId);
    if (!agent) {
      throw new Error(`Agent with id ${agentId} not found`);
    }
    const currentGroupId = agent.data.parentId as string | null;
    if (currentGroupId) {
      AgentsStore.removeGroupMember(currentGroupId, agentId, get, set);
    }
    if (newGroupId) {
      AgentsStore.addGroupMember(newGroupId, agentId, get, set);
    }
  }
  static exportAgent: (
    agentId: string,
    skipLinks: boolean,
    get: typeOfGet
  ) => { [key: string]: unknown } | null = (agentId, skipLinks, get) => {
    const agent = get().nodes.find(node => node.id === agentId && node.type === 'agent');
    if (!agent) {
      return null;
    }
    return exportAgent(agent as WaldiezAgentNode, skipLinks);
  };
  static importAgent: (
    data: { [key: string]: unknown },
    agentId: string,
    skipLinks: boolean,
    position: { x: number; y: number } | undefined
  ) => WaldiezAgentNode = (data, agentId, skipLinks, position) => {
    const agent = importAgent(data, agentId, skipLinks);
    if (position) {
      agent.position = position;
    }
    return agent;
  };
}
