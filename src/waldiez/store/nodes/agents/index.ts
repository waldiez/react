import { Edge } from '@xyflow/react';

import { nanoid } from 'nanoid';

import {
  WaldieAgentNode,
  WaldieAgentNodeType,
  WaldieEdge,
  WaldieSourceEdge,
  WaldieSourceEdgeData
} from '@waldiez/models';
import { EdgesStore } from '@waldiez/store/edges';
import { exportAgent } from '@waldiez/store/exporting';
import { importAgent } from '@waldiez/store/importing';
import { getAgentNode } from '@waldiez/store/nodes/agents/utils';
import { typeOfGet, typeOfSet } from '@waldiez/store/types';

export class AgentsStore {
  static getAgents: (get: typeOfGet) => WaldieAgentNode[] = get => {
    return get().nodes.filter(node => node.type === 'agent') as WaldieAgentNode[];
  };
  static addAgent: (
    agentType: WaldieAgentNodeType,
    position: { x: number; y: number },
    get: typeOfGet,
    set: typeOfSet,
    parentId?: string
  ) => WaldieAgentNode = (agentType, position, get, set, parentId) => {
    const newNode = getAgentNode(agentType, position) as WaldieAgentNode;
    if (parentId) {
      newNode.parentId = parentId;
      newNode.extent = 'parent';
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
    return newNode as WaldieAgentNode;
  };
  static getAgentById: (agentId: string, get: typeOfGet) => WaldieAgentNode | null = (agentId, get) => {
    const agent = get().nodes.find(node => node.id === agentId && node.type === 'agent');
    if (!agent) {
      return null;
    }
    return agent as WaldieAgentNode;
  };
  static cloneAgent: (agentId: string, get: typeOfGet, set: typeOfSet) => WaldieAgentNode = (
    agentId,
    get,
    set
  ) => {
    const agent = get().nodes.find(node => node.id === agentId);
    if (!agent) {
      throw new Error(`Agent with id ${agentId} not found`);
    }
    const newNode = {
      id: `wa-${nanoid()}`,
      data: { ...agent.data, label: `${agent.data.label} (copy)` },
      position: {
        x: agent.position.x + (agent.width ?? 100) + 40,
        y: agent.position.y + (agent.height ?? 100) + 40
      }
    } as WaldieAgentNode;
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
    data: Partial<WaldieAgentNode['data']>,
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
  };
  static deleteAgent: (agentId: string, get: typeOfGet, set: typeOfSet) => void = (agentId, get, set) => {
    // if the agent is a group manager, remove the members' parentIds
    const agent = get().nodes.find(node => node.id === agentId);
    if (agent && agent.data.agentType === 'manager') {
      const groupMembers = get().nodes.filter(node => node.type === 'agent' && node.parentId === agentId);
      set({
        nodes: get().nodes.map(node => {
          if (groupMembers.some(member => member.id === node.id)) {
            return {
              ...node,
              parentId: undefined,
              extent: undefined
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
  };
  static getEdgeSourceAgent = (get: typeOfGet, edge: Edge) => {
    const sourceNode = get().nodes.find(node => {
      if (node.id !== edge.source) {
        return false;
      }
      // return !!(node as WaldieAgentNode).parentId;
      // why exclude manager nodes?
      return (node as WaldieAgentNode).data.agentType !== 'manager';
    });
    return sourceNode as WaldieAgentNode | undefined;
  };
  static getEdgeTargetAgent = (get: typeOfGet, edge: Edge) => {
    const targetNode = get().nodes.find(node => {
      if (node.id !== edge.target) {
        return false;
      }
      // return !!(node as WaldieAgentNode).parentId;
      // why exclude manager nodes?
      return (node as WaldieAgentNode).data.agentType !== 'manager';
    });
    return targetNode as WaldieAgentNode | undefined;
  };
  static getAgentEdgeConnections = (
    nodeId: string,
    edge: Edge,
    get: typeOfGet,
    targetsOnly?: boolean,
    sourcesOnly?: boolean
  ) => {
    let targetNode;
    if (edge.source === nodeId && !targetsOnly) {
      targetNode = AgentsStore.getEdgeTargetAgent(get, edge);
    }
    let sourceNode;
    if (edge.target === nodeId && !sourcesOnly) {
      sourceNode = AgentsStore.getEdgeSourceAgent(get, edge);
    }
    return { sourceNode, targetNode };
  };
  /* eslint-disable max-statements */
  static getAgentConnections: (
    nodeId: string,
    get: typeOfGet,
    options: {
      sourcesOnly?: boolean;
      targetsOnly?: boolean;
    }
  ) => {
    source: {
      nodes: WaldieAgentNode[];
      edges: WaldieEdge[];
    };
    target: {
      nodes: WaldieAgentNode[];
      edges: WaldieEdge[];
    };
  } = (nodeId, get, options) => {
    const { sourcesOnly, targetsOnly } = options;
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
        sourcesOnly
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
        nodes: sourceConnectedNodes as WaldieAgentNode[],
        edges: sourceConnectionEdges as WaldieEdge[]
      },
      target: {
        nodes: targetConnectedNodes as WaldieAgentNode[],
        edges: targetConnectionEdges as WaldieEdge[]
      }
    };
  };
  static getGroupMembers: (groupId: string, get: typeOfGet) => WaldieAgentNode[] = (groupId, get) => {
    return get().nodes.filter(
      node => node.type === 'agent' && node.parentId === groupId
    ) as WaldieAgentNode[];
  };
  static addGroupMember: (groupId: string, memberId: string, get: typeOfGet, set: typeOfSet) => void = (
    groupId,
    memberId,
    get,
    set
  ) => {
    // add an edge with source the parent and target the member
    const newEdge = new WaldieSourceEdge({
      id: `we-${nanoid()}`,
      source: groupId,
      target: memberId,
      data: new WaldieSourceEdgeData(groupId, memberId),
      rest: {}
    }).asEdge();
    const newEdges: Edge[] = [{ ...newEdge, type: 'hidden', selected: false }];
    // add the remaining edges
    const remainingEdges = get().edges.filter(edge => edge.source !== memberId);
    set({
      nodes: get().nodes.map(node => {
        if (node.id === memberId) {
          return { ...node, parentId: groupId, extent: 'parent' };
        }
        return node;
      }),
      edges: [...remainingEdges, ...newEdges],
      updatedAt: new Date().toISOString()
    });
    EdgesStore.resetEdgePositions(get, set);
  };
  static removeGroupMember: (groupId: string, memberId: string, get: typeOfGet, set: typeOfSet) => void = (
    groupId,
    memberId,
    get,
    set
  ) => {
    const nodes = [
      ...get().nodes.map(node => {
        if (node.id === memberId && node.parentId === groupId) {
          delete node.parentId;
          delete node.extent;
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
            parentId: groupId,
            extent: 'parent'
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
    const currentGroupId = agent.parentId;
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
    return exportAgent(agent as WaldieAgentNode, skipLinks);
  };
  static importAgent: (
    data: { [key: string]: unknown },
    agentId: string,
    skipLinks: boolean,
    position: { x: number; y: number } | undefined
  ) => WaldieAgentNode = (data, agentId, skipLinks, position) => {
    const agent = importAgent(data, agentId, skipLinks);
    if (position) {
      agent.position = position;
    }
    return agent;
  };
}
