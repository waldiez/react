import { WaldiezSourceEdge, WaldiezSourceEdgeData } from '@waldiez/models';

export const edgeDataJson = {
  source: 'sourceId',
  target: 'targetId',
  name: 'edgeName',
  description: 'edgeDescription',
  position: 1,
  order: 1,
  clearHistory: false,
  message: {
    type: 'string',
    use_carryover: false,
    content: 'messageText',
    context: {
      contextKey: 'contextValue'
    }
  },
  maxTurns: 1,
  summary: {
    method: 'reflection_with_llm',
    prompt: 'Summarize the chat',
    args: {
      optionKey: 'optionValue'
    }
  },
  nestedChat: {
    message: {
      type: 'string',
      use_carryover: false,
      content: 'nestedMessageText',
      context: {}
    },
    reply: {
      type: 'method',
      use_carryover: false,
      content: 'def method():\n    return "nestedReplyText"',
      context: {}
    }
  }
};
export const edgeJson = {
  id: 'edgeId',
  data: edgeDataJson,
  source: 'sourceId',
  target: 'targetId',
  type: 'chat',
  rest: {
    restKey: 'restValue'
  }
};

export const stringMessageJson = {
  type: 'string',
  content: 'test content',
  context: {
    carryover: 'test1',
    other: 4,
    another: {
      test: 'test'
    }
  }
};

export const methodMessageJson = {
  type: 'method',
  content: 'def custom_method():\n    return "Hello"',
  context: {
    test: 'test2'
  }
};

export const noneMessageJson = {
  type: 'none',
  content: null
};

export const messageWithCarryOver = {
  type: 'string',
  content: 'test content',
  use_carryover: true,
  context: {}
};

export const messageWithCarryOverCamel = {
  type: 'string',
  content: 'test content',
  useCarryover: true,
  context: {}
};

export const summaryNoneJson = {
  method: null,
  prompt: '',
  args: {}
};
export const summaryReflectionJson = {
  method: 'reflection_with_llm',
  prompt: 'Summarize the chat',
  args: {
    optionKey: 'optionValue'
  }
};
export const summaryLastMsgJson = {
  method: 'last_msg',
  prompt: 'Summarize the chat',
  args: {
    optionKey: 'optionValue'
  }
};
export const waldieEdgeData: WaldiezSourceEdgeData = {
  source: 'sourceId',
  target: 'targetId',
  name: 'edgeName',
  description: 'edgeDescription',
  position: 1,
  order: 1,
  clearHistory: false,
  message: {
    type: 'string',
    content: 'messageText',
    use_carryover: false,
    context: {
      contextKey: 'contextValue'
    }
  },
  maxTurns: 1,
  summary: {
    method: 'reflection_with_llm',
    prompt: 'Summarize the chat',
    args: {
      optionKey: 'optionValue'
    }
  },
  nestedChat: {
    message: {
      type: 'method',
      use_carryover: false,
      content: 'def method():\n    return "nestedMessageText"',
      context: {
        messageContextKey1: 'messageContextValue1',
        messageContextKey2: 'messageContextValue2'
      }
    },
    reply: {
      type: 'none',
      use_carryover: false,
      content: null,
      context: {}
    }
  }
};

export const waldieEdgeSource = new WaldiezSourceEdge({
  id: 'edgeId',
  source: 'sourceId',
  target: 'targetId',
  data: waldieEdgeData,
  rest: {
    animated: false,
    type: 'chat'
  }
});
