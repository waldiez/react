import { createdAt, edgesCount, updatedAt } from './common';

import { Edge } from '@xyflow/react';

import { WaldieEdgeLlmSummaryMethod, WaldieMessageType } from '@waldiez/models';

const edges: Edge[] = [];
for (let i = 0; i < edgesCount; i++) {
  let chatType = 'chat';
  if (i % 3 === 1) {
    chatType = 'nested';
  } else if (i % 3 === 2) {
    chatType = 'group';
  }
  edges.push({
    id: `edge-${i}`,
    source: `agent-${i}`,
    target: `agent-${i + 1}`,
    type: chatType,
    data: {
      label: `Edge ${i}`,
      position: i,
      order: i,
      clearHistory: false,
      summary: {
        method: 'last_msg' as WaldieEdgeLlmSummaryMethod,
        prompt: 'Summarize the conversation',
        args: {
          'summary-arg-key': 'summary-arg-value'
        }
      },
      maxTurns: 2,
      message: {
        type: 'string' as WaldieMessageType,
        content: 'Chat Message',
        context: {
          'context-key': 'context-value'
        },
        use_carryover: false
      },
      nestedChat: {
        message: {
          type: 'string' as WaldieMessageType,
          content: 'Nested Chat Message',
          context: {
            'nested-message-context-key': 'nested-message-context-value'
          }
        },
        reply: {
          type: 'method' as WaldieMessageType,
          content: 'def custom_method(context):\n    return "Nested Chat Reply"',
          context: {
            'nested-reply-context-key': 'nested-reply-context-value'
          }
        }
      },
      createdAt,
      updatedAt
    }
  });
}
export { edges };
