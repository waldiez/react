import { WaldiezEdgeMessageTabProps } from '@waldiez/components/edges/modal/tabs/message/types';
import { WaldiezEdgeMessageTabView } from '@waldiez/components/edges/modal/tabs/message/view';
import { WaldiezMessage, WaldiezMessageType } from '@waldiez/models';

export const WaldiezEdgeMessageTab = (props: WaldiezEdgeMessageTabProps) => {
  const { edgeId, data, darkMode, skipRagOption, onDataChange } = props;
  const onMessageTypeChange = (type: WaldiezMessageType) => {
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
  const onMessageChange = (message: WaldiezMessage) => {
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
    <WaldiezEdgeMessageTabView
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
