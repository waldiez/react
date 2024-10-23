export type WaldiezMessageType = 'string' | 'method' | 'rag_message_generator' | 'none';
/**
 * Waldie Message.
 *
 * A generic message with a type and content.
 *
 * If the type is not 'none', the content is a string.
 * If the type is 'method', the content is the code of a method.
 *
 * @param type - The type of the message
 * @param content - The content of the message
 */
export interface IWaldiezMessage {
  type: WaldiezMessageType;
  use_carryover: boolean;
  content: string | null;
  context: { [key: string]: string };
}
