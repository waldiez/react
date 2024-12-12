import { Edge, Node } from '@xyflow/react';

import { getFlowChats } from '@waldiez/store/importing/chat';
import { getEntryMeta } from '@waldiez/store/importing/common';
import { getFlowEdges } from '@waldiez/store/importing/flow/edges';
import { getFlowAgents, getFlowExportedNodes, getFlowNodes } from '@waldiez/store/importing/flow/nodes';
import { getFlowViewPort } from '@waldiez/store/importing/flow/viewport';
import { WaldiezImportProps } from '@waldiez/store/types';

export { loadFlow } from '@waldiez/store/importing/flow/load';

const emptyFlow: WaldiezImportProps = {
  flowId: undefined,
  storageId: undefined,
  nodes: [],
  edges: [],
  viewport: { zoom: 1, x: 0, y: 0 },
  name: 'Waldiez Flow',
  description: 'A waldiez flow',
  tags: [],
  requirements: []
};

export const importFlow: (thing: unknown) => WaldiezImportProps = thing => {
  if (typeof thing === 'string') {
    try {
      thing = JSON.parse(thing);
    } catch (_) {
      console.error('Invalid flow data');
      return emptyFlow;
    }
  }
  if (!thing || typeof thing !== 'object' || !('type' in thing) || thing.type !== 'flow') {
    console.error('Invalid flow data');
    return emptyFlow;
  }
  let json = thing as {
    [key: string]: unknown;
  };
  const { id, name, description, tags, requirements, createdAt, updatedAt } = getEntryMeta(
    json,
    'Waldiez flow',
    'A waldiez flow'
  );
  let storageId = id;
  if ('storageId' in json && typeof json.storageId === 'string') {
    storageId = json.storageId;
  }
  if ('data' in json && typeof json.data === 'object' && json.data) {
    json = json.data as { [key: string]: unknown };
  }
  const viewport = getFlowViewPort(json);
  const nodes: Node[] = getFlowNodes(json);
  let edges: Edge[] = getFlowEdges(json);
  getFlowAgents(nodes, edges, json);
  getFlowExportedNodes(nodes, edges, json, 'model');
  getFlowExportedNodes(nodes, edges, json, 'skill');
  edges = getFlowChats(edges, nodes, json);
  if (nodes.length === 0) {
    return {
      ...emptyFlow,
      flowId: id,
      name,
      description,
      tags,
      requirements,
      storageId,
      createdAt,
      updatedAt
    };
  }
  return {
    flowId: id,
    nodes,
    edges,
    viewport,
    name,
    description,
    tags,
    requirements,
    storageId,
    createdAt,
    updatedAt
  };
};
