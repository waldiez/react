import { IWaldieMessage, WaldieMessageType } from '@waldiez/models/types';

export class WaldieMessage implements IWaldieMessage {
  type: WaldieMessageType;
  content: string | null;
  use_carryover: boolean;
  context: { [key: string]: string };

  constructor(
    data: IWaldieMessage = {
      type: 'none',
      use_carryover: false,
      content: null,
      context: {}
    }
  ) {
    this.type = data.type;
    this.use_carryover = data.use_carryover;
    this.content = data.content;
    this.context = data.context;
  }

  static fromJSON(data: unknown): WaldieMessage {
    if (typeof data !== 'object' || !data) {
      return new WaldieMessage({
        type: 'none',
        use_carryover: false,
        content: null,
        context: {}
      });
    }
    const json = data as Record<string, unknown>;
    const messageType = WaldieMessage.getMessageType(json);
    const messageContent = WaldieMessage.getMessageContent(json);
    const messageContext = WaldieMessage.getMessageContext(json);
    const useCarryover = WaldieMessage.getUseCarryover(json);
    return new WaldieMessage({
      type: messageType,
      use_carryover: useCarryover,
      content: messageContent,
      context: messageContext
    });
  }

  private static getMessageType(json: Record<string, unknown>): WaldieMessageType {
    let messageType: WaldieMessageType = 'none';
    if (
      'type' in json &&
      typeof json.type === 'string' &&
      ['string', 'method', 'none', 'rag_message_generator'].includes(json.type)
    ) {
      messageType = json.type as WaldieMessageType;
    }
    return messageType;
  }

  private static getMessageContent(json: Record<string, unknown>): string | null {
    let messageContent: string | null = null;
    if ('content' in json && typeof json.content === 'string') {
      messageContent = json.content;
    }
    return messageContent;
  }

  private static getMessageContext(json: Record<string, unknown>): {
    [key: string]: string;
  } {
    let messageContext: { [key: string]: string } = {};
    if ('context' in json && typeof json.context === 'object' && json.context) {
      // have the values be strings (toString)
      messageContext = Object.entries(json.context).reduce(
        (acc, [key, value]) => {
          if (typeof value === 'string') {
            acc[key] = value;
          } else if (typeof value === 'number') {
            acc[key] = value.toString();
            // } else //  check if has toString method!!!!!!
          } else if (typeof value === 'object' && value !== null) {
            if (typeof value.toString === 'function') {
              acc[key] = value.toString();
            }
          }
          return acc;
        },
        {} as { [key: string]: string }
      );
    }
    return messageContext;
  }

  private static getUseCarryover(json: Record<string, unknown>): boolean {
    let useCarryover: boolean = false;
    if ('use_carryover' in json && typeof json.use_carryover === 'boolean') {
      useCarryover = json.use_carryover;
    } else if ('useCarryover' in json && typeof json.useCarryover === 'boolean') {
      useCarryover = json.useCarryover;
    }
    return useCarryover;
  }
}
