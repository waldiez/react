import { WaldieEdgeMessageTabProps } from '@waldiez/components/edges/modal/tabs/message/types';
import { WaldieEdgeMessageTabView } from '@waldiez/components/edges/modal/tabs/message/view';
import { WaldieMessage, WaldieMessageType } from '@waldiez/models';

export const WaldieEdgeMessageTab = (props: WaldieEdgeMessageTabProps) => {
  const { edgeId, data, darkMode, skipRagOption, onDataChange } = props;
  const onMessageTypeChange = (type: WaldieMessageType) => {
    onDataChange({
      message: {
        ...data.message,
        type,
        use_carryover: false,
        content: null,
        context: {}
      }
    });
  };
  const onMessageChange = (message: WaldieMessage) => {
    onDataChange({ message });
  };
  const onAddMessageContextEntry = (key: string, value: string) => {
    const messageContext = data.message.context;
    messageContext[key] = value;
    onDataChange({ message: { ...data.message, context: messageContext } });
  };
  const onRemoveMessageContextEntry = (key: string) => {
    const messageContext = data.message.context;
    delete messageContext[key];
    onDataChange({ message: { ...data.message, context: messageContext } });
  };
  const onUpdateMessageContextEntries = (entries: Record<string, string>) => {
    onDataChange({ message: { ...data.message, context: entries } });
  };
  return (
    <WaldieEdgeMessageTabView
      edgeId={edgeId}
      data={data}
      darkMode={darkMode}
      skipRagOption={skipRagOption}
      onMessageTypeChange={onMessageTypeChange}
      onMessageChange={onMessageChange}
      onAddMessageContextEntry={onAddMessageContextEntry}
      onRemoveMessageContextEntry={onRemoveMessageContextEntry}
      onUpdateMessageContextEntries={onUpdateMessageContextEntries}
    />
  );
};
