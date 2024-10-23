import { Edge } from '@xyflow/react';

import { WaldiezAgentNestedChat } from '@waldiez/models';

export const getAgentNestedChats = (elementData: any, flowEdges: Edge[]): WaldiezAgentNestedChat[] => {
  const nestedChats: WaldiezAgentNestedChat[] = elementData.nestedChats;
  const newNestedChats: WaldiezAgentNestedChat[] = [];
  nestedChats.forEach(nestedChat => {
    let chatTriggers = [...nestedChat.triggeredBy];
    let chatMessages = [...nestedChat.messages];
    nestedChat.triggeredBy.forEach(triggered => {
      const edge = flowEdges.find(e => e.id === triggered.id);
      // if the nestedChat.triggeredBy[].id have ids not in the existing edges,
      // remove the entry from the nestedChat.triggeredBy.
      // external agent?
      if (!edge) {
        chatTriggers = chatTriggers.filter(t => t.id !== triggered.id);
      }
    });
    nestedChat.messages.forEach(message => {
      const edge = flowEdges.find(e => e.id === message.id);
      // if the nestedChat.messages[].id have ids not in the existing edges,
      // remove the entry from the nestedChat.messages.
      if (!edge) {
        chatMessages = chatMessages.filter(m => m.id !== message.id);
      }
    });
    nestedChat.triggeredBy = chatTriggers;
    nestedChat.messages = chatMessages;
    newNestedChats.push(nestedChat);
  });
  return newNestedChats;
};
