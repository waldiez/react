import { Edge, Node } from '@xyflow/react';

import { WaldiezAgentNestedChat } from '@waldiez/models';

export const getAgentNestedChats: (
  agentId: string,
  elementData: any,
  flowEdges: Edge[],
  flowNodes: Node[]
) => WaldiezAgentNestedChat[] = (agentId, elementData, flowEdges, flowNodes) => {
  const newNestedChats: WaldiezAgentNestedChat[] = [];
  if ('nestedChats' in elementData && Array.isArray(elementData.nestedChats)) {
    for (const chat of elementData.nestedChats) {
      const triggeredBy = getNestedChatTriggeredBy(agentId, chat, flowEdges, flowNodes);
      const messages = getNestedChatMessages(chat, flowEdges);
      if (triggeredBy.length > 0 || messages.length > 0) {
        newNestedChats.push({ triggeredBy, messages });
      }
    }
  } else {
    if ('data' in elementData && typeof elementData.data === 'object' && elementData.data) {
      return getAgentNestedChats(agentId, elementData.data, flowEdges, flowNodes);
    }
  }
  return newNestedChats;
};
const getNestedChatTriggeredBy: (
  agentId: string,
  chat: any,
  flowEdges: Edge[],
  flowNodes: Node[]
) => string[] = (agentId: string, chat: any, flowEdges: Edge[], flowNodes: Node[]) => {
  // old version: [{ triggeredBy: [{id: string, isReply: boolean}], messages: [{ id: string, isReply: boolean }] }]
  // new version: [{ triggeredBy: string[], messages: [{ id: string, isReply: boolean }] }]
  // in the old version, the id is the id of the Edge (agents connection)
  // in the new version, the id is the id of the Node (the agent that can trigger the nested chat)
  // let's try to handle both versions here
  const triggeredBy = [];
  if ('triggeredBy' in chat && Array.isArray(chat.triggeredBy)) {
    for (const trigger of chat.triggeredBy) {
      if (typeof trigger === 'string') {
        const agent = flowNodes.find(n => n.type === 'agent' && n.id === trigger);
        if (agent) {
          triggeredBy.push(trigger);
        }
      } else {
        if (
          typeof trigger === 'object' &&
          'id' in trigger &&
          typeof trigger.id === 'string' &&
          'isReply' in trigger &&
          typeof trigger.isReply === 'boolean'
        ) {
          const triggerEdgeId = trigger.id;
          const edge = flowEdges.find(e => e.id === triggerEdgeId);
          const isReply = trigger.isReply;
          /* eslint-disable max-depth */
          if (edge) {
            let triggerId = isReply ? edge.source : edge.target;
            if (triggerId === agentId) {
              triggerId = isReply ? edge.target : edge.source;
            }
            const agent = flowNodes.find(n => n.type === 'agent' && n.id === triggerId);
            if (agent) {
              triggeredBy.push(triggerId);
            }
          }
        }
      }
    }
  }
  return triggeredBy;
};

const getNestedChatMessages: (chat: any, flowEdges: Edge[]) => { id: string; isReply: boolean }[] = (
  chat: any,
  flowEdges: Edge[]
) => {
  const messages = [];
  if ('messages' in chat && Array.isArray(chat.messages)) {
    for (const message of chat.messages) {
      if (
        typeof message === 'object' &&
        'id' in message &&
        typeof message.id === 'string' &&
        'isReply' in message &&
        typeof message.isReply === 'boolean'
      ) {
        const messageId = message.id;
        const isReply = message.isReply;
        const edge = flowEdges.find(e => e.id === messageId);
        if (edge) {
          messages.push({ id: messageId, isReply });
        }
      }
    }
  }
  return messages;
};
