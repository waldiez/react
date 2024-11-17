import { Edge, Node } from '@xyflow/react';

import { WaldiezAgentNestedChat } from '@waldiez/models';

export const getAgentNestedChats: (
  elementData: any,
  flowEdges: Edge[],
  flowNodes: Node[]
) => WaldiezAgentNestedChat[] = (elementData: any, flowEdges: Edge[], flowNodes: Node[]) => {
  const newNestedChats: WaldiezAgentNestedChat[] = [];
  if ('nestedChats' in elementData && Array.isArray(elementData.nestedChats)) {
    const nestedChats = elementData.nestedChats;
    for (const chat of nestedChats) {
      const triggeredBy = getNestedChatTriggeredBy(chat, flowEdges, flowNodes);
      const messages = getNestedChatMessages(chat, flowEdges);
      if (triggeredBy.length > 0 || messages.length > 0) {
        newNestedChats.push({ triggeredBy, messages });
      }
    }
  }
  return newNestedChats;
};
const getNestedChatTriggeredBy: (chat: any, flowEdges: Edge[], flowNodes: Node[]) => string[] = (
  chat: any,
  flowEdges: Edge[],
  flowNodes: Node[]
) => {
  // old version: [{ triggeredBy: [{id: string, isReply: boolean}], messages: [{ id: string, isReply: boolean }] }]
  // new version: [{ triggeredBy: string[], messages: [{ id: string, isReply: boolean }] }]
  // in the old version, the id is the id of the Edge
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
            const agentId = isReply ? edge.source : edge.target;
            const agent = flowNodes.find(n => n.type === 'agent' && n.id === agentId);
            if (agent) {
              triggeredBy.push(agentId);
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
