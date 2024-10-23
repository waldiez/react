import { Edge } from '@xyflow/react';

import { WaldiezEdgeData } from '@waldiez/models';

const VALID_CHAT_TYPES = ['chat', 'nested', 'group', 'hidden'];
const VALID_CHAT_MESSAGE_TYPES = ['string', 'method', 'rag_message_generator', 'none'];
type chatMessageType = 'string' | 'method' | 'rag_message_generator' | 'none';

export const exportChat = (chat: Edge) => {
  const json: { [key: string]: any } = {
    id: chat.id,
    data: {
      source: chat.source,
      target: chat.target
    }
  };
  const chatType = getChatType(chat);
  const data = chat.data as WaldiezEdgeData;
  json.data = {
    ...json.data,
    name: getChatName(data),
    order: getChatOrder(data, chatType),
    description: getChatDescription(data),
    position: getChatPosition(data),
    clearHistory: getChatClearHistory(data),
    maxTurns: getChatMaxTurns(data),
    message: getChatMessage(data),
    nestedChat: getNestedChat(data),
    summary: getChatSummary(data)
  };
  return json;
};

const getChatName = (data: WaldiezEdgeData) => {
  let name = 'Chat';
  if ('label' in data && data.label) {
    if (typeof data.label === 'string') {
      name = data.label;
    }
  }
  return name;
};

const getChatDescription = (data: WaldiezEdgeData) => {
  let description = 'Chat Description';
  if ('description' in data && data.description) {
    if (typeof data.description === 'string') {
      description = data.description;
    }
  }
  return description;
};

const getChatPosition = (data: WaldiezEdgeData) => {
  let position = 0;
  if ('position' in data && typeof data.position === 'number') {
    position = data.position;
  }
  return position;
};

const getChatClearHistory = (data: WaldiezEdgeData) => {
  let clearHistory = null;
  if ('clearHistory' in data && typeof data.clearHistory === 'boolean') {
    clearHistory = data.clearHistory;
  }
  return clearHistory;
};

const getChatMaxTurns = (data: WaldiezEdgeData) => {
  let maxTurns = null;
  if ('maxTurns' in data && typeof data.maxTurns === 'number') {
    maxTurns = data.maxTurns;
  }
  return maxTurns;
};

const getChatMessage = (data: { [key: string]: any }) => {
  const message = {
    type: 'none',
    use_carryover: false,
    content: null,
    context: {}
  } as {
    type: chatMessageType;
    use_carryover: boolean;
    content: string | null;
    context: { [key: string]: any };
  };
  let messageData = data;
  if (messageData && typeof messageData === 'object' && 'message' in messageData && messageData.message) {
    messageData = messageData.message;
  }
  message.type = getChatMessageType(messageData);
  message.content = getMessageContent(messageData);
  message.context = getMessageContext(messageData);
  message.use_carryover = getMessageUseCarryover(messageData);
  return message;
};

const getChatMessageType = (data: { [key: string]: any }) => {
  let type: chatMessageType = 'none';
  if ('type' in data && data.type) {
    if (typeof data.type === 'string' && VALID_CHAT_MESSAGE_TYPES.includes(data.type)) {
      type = data.type as chatMessageType;
    }
  }
  return type;
};

const getMessageContent = (data: { [key: string]: any }) => {
  let content: string | null = null;
  if ('content' in data && data.content) {
    if (typeof data.content === 'string') {
      content = data.content;
    }
  }
  return content;
};

const getMessageContext = (data: { [key: string]: any }) => {
  let context = {} as { [key: string]: any };
  if ('context' in data && data.context) {
    if (typeof data.context === 'object') {
      context = Object.keys(data.context).reduce(
        (acc, key) => {
          acc[key.toString()] = data.context[key];
          return acc;
        },
        {} as { [key: string]: any }
      );
    }
  }
  return context;
};

const getMessageUseCarryover = (data: { [key: string]: any }) => {
  let useCarryover = false;
  if ('use_carryover' in data && typeof data.use_carryover === 'boolean') {
    useCarryover = data.use_carryover;
  }
  /* deprecated */
  if ('useCarryover' in data && typeof data.useCarryover === 'boolean') {
    useCarryover = data.useCarryover;
  }
  return useCarryover;
};

const getChatType = (data: Edge) => {
  let chatType = 'chat';
  if (data.type && VALID_CHAT_TYPES.includes(data.type)) {
    chatType = data.type;
  }
  return chatType;
};

const getChatSummary = (data: { [key: string]: any }) => {
  const summary = {
    method: null,
    prompt: '',
    args: {}
  } as {
    method: string | null;
    prompt: string;
    args: { [key: string]: string };
  };
  if ('summary' in data && data.summary) {
    summary.method = getChatSummaryMethod(data);
    summary.prompt = getChatSummaryPrompt(data);
    summary.args = getChatSummaryArgs(data);
  }
  return summary;
};

const getChatSummaryMethod = (data: { [key: string]: any }) => {
  let method: string | null = null;
  if ('method' in data.summary && data.summary.method) {
    if (typeof data.summary.method === 'string') {
      method = data.summary.method;
    }
  }
  return method;
};

const getChatSummaryPrompt = (data: { [key: string]: any }) => {
  let prompt = '';
  if ('prompt' in data.summary && typeof data.summary.prompt === 'string') {
    prompt = data.summary.prompt;
  }
  return prompt;
};

const getChatSummaryArgs = (data: { [key: string]: any }) => {
  let args = {} as { [key: string]: string };
  if ('args' in data.summary && data.summary.args) {
    if (typeof data.summary.args === 'object') {
      args = Object.keys(data.summary.args).reduce(
        (acc, key) => {
          acc[key.toString()] = data.summary.args[key];
          return acc;
        },
        {} as { [key: string]: string }
      );
    }
  }
  return args;
};

const getNestedChat = (data: { [key: string]: any }) => {
  const nestedChat = {
    message: null,
    reply: null
  } as {
    message: {
      type: string;
      content: string | null;
      context: { [key: string]: any };
    } | null;
    reply: {
      type: string;
      content: string | null;
      context: { [key: string]: any };
    } | null;
  };
  if ('nestedChat' in data && data.nestedChat) {
    if ('message' in data.nestedChat && data.nestedChat.message) {
      nestedChat.message = getChatMessage(data.nestedChat.message);
    }
    if ('reply' in data.nestedChat && data.nestedChat.reply) {
      nestedChat.reply = getChatMessage(data.nestedChat.reply);
    }
  }
  return nestedChat;
};

const getChatOrder = (data: { [key: string]: any }, chatType: string) => {
  let order = -1;
  if ('order' in data && typeof data.order === 'number') {
    order = data.order;
  }
  if (chatType === 'nested' || chatType === 'hidden') {
    order = -1;
  }
  return order;
};
