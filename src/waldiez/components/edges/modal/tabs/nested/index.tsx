import { WaldieEdgeNestedTabProps } from '@waldiez/components/edges/modal/tabs/nested/types';
import { WaldieEdgeNestedTabView } from '@waldiez/components/edges/modal/tabs/nested/view';
import { WaldieMessage, WaldieMessageType } from '@waldiez/models';

export const WaldieEdgeNestedTab = (props: WaldieEdgeNestedTabProps) => {
  const { flowId, edgeId, darkMode, data, onDataChange } = props;
  const onNestedMessageTypeChange = (type: WaldieMessageType) => {
    onDataChange({
      nestedChat: {
        reply: data.nestedChat.reply,
        message: {
          type,
          use_carryover: false,
          content: null,
          context: {}
        }
      }
    });
  };
  const onNestedReplyTypeChange = (type: WaldieMessageType) => {
    onDataChange({
      nestedChat: {
        message: data.nestedChat.message,
        reply: {
          type,
          use_carryover: false,
          content: null,
          context: {}
        }
      }
    });
  };
  const onNestedMessageChange = (message: WaldieMessage) => {
    onDataChange({
      nestedChat: {
        reply: data.nestedChat.reply,
        message
      }
    });
  };
  const onNestedReplyChange = (reply: WaldieMessage) => {
    onDataChange({
      nestedChat: {
        message: data.nestedChat.message,
        reply
      }
    });
  };
  // not in nested (for now?), if we want to add it,
  // we must add the context in the message's config argument
  // in `def nested_chat_message(recipient, messages, sender, config):`
  // set config['context'] = context
  // this makes sense only if the type is not `method` and not `none` (i.e. text or or carryover + text)
  // so for now a custom method can be used to handle the context
  const noOp = () => {};
  return (
    <WaldieEdgeNestedTabView
      flowId={flowId}
      edgeId={edgeId}
      darkMode={darkMode}
      data={data}
      onNestedMessageTypeChange={onNestedMessageTypeChange}
      onNestedMessageChange={onNestedMessageChange}
      onAddNestedMessageContextEntry={noOp}
      onRemoveNestedMessageContextEntry={noOp}
      onUpdateNestedMessageContextEntries={noOp}
      onNestedReplyTypeChange={onNestedReplyTypeChange}
      onNestedReplyChange={onNestedReplyChange}
      onAddReplyContextEntry={noOp}
      onRemoveReplyContextEntry={noOp}
      onUpdateReplyContextEntries={noOp}
    />
  );
};
