import { MessageInputProps } from '@waldiez/components/inputs/messageInput/types';
import { MessageInputView } from '@waldiez/components/inputs/messageInput/view';
import { WaldiezMessage, WaldiezMessageType } from '@waldiez/models';

export const MessageInput = (props: MessageInputProps) => {
  const {
    current,
    darkMode,
    defaultContent,
    selectLabel,
    selectTestId,
    notNoneLabel,
    notNoneLabelInfo,
    includeContext,
    skipRagOption,
    onTypeChange,
    onMessageChange,
    onAddContextEntry,
    onRemoveContextEntry,
    onUpdateContextEntries
  } = props;
  const handleEdgeMessageChange = (message: WaldiezMessage) => {
    onMessageChange(message);
  };
  const handleAddContextEntry = (key: string, value: string) => {
    if (onAddContextEntry) {
      onAddContextEntry(key, value);
    }
  };
  const handleRemoveContextEntry = (key: string) => {
    if (onRemoveContextEntry) {
      onRemoveContextEntry(key);
    }
  };
  const handleUpdateContextEntries = (entries: Record<string, string>) => {
    if (onUpdateContextEntries) {
      onUpdateContextEntries(entries);
    }
  };
  const selectOptions = skipRagOption
    ? messageTypeOptions.filter(option => option.value !== 'rag_message_generator')
    : messageTypeOptions;
  const useDict = includeContext && current.type !== 'rag_message_generator' && current.type !== 'none';
  const onContentUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleEdgeMessageChange({
      type: 'string',
      use_carryover: current.use_carryover,
      content: e.target.value,
      context: current.context
    });
  };
  const onRagProblemUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleEdgeMessageChange({
      type: 'rag_message_generator',
      content: null,
      use_carryover: current.use_carryover,
      context: {
        ...current.context,
        problem: e.target.value
      }
    });
  };
  const onMethodContentUpdate = (value: string | undefined) => {
    if (value) {
      handleEdgeMessageChange({
        type: 'method',
        use_carryover: current.use_carryover,
        content: value,
        context: current.context
      });
    }
  };
  const onUseCarryoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleEdgeMessageChange({
      type: current.type,
      use_carryover: e.target.checked,
      content: current.content,
      context: current.context
    });
  };

  return (
    <MessageInputView
      current={current}
      defaultContent={defaultContent}
      darkMode={darkMode}
      selectLabel={selectLabel}
      selectOptions={selectOptions}
      selectTestId={selectTestId}
      useDict={useDict}
      notNoneLabel={notNoneLabel}
      notNoneLabelInfo={notNoneLabelInfo}
      onTypeChange={onTypeChange}
      onUseCarryoverChange={onUseCarryoverChange}
      onContentUpdate={onContentUpdate}
      onRagProblemUpdate={onRagProblemUpdate}
      onMethodContentUpdate={onMethodContentUpdate}
      onAddContextEntry={handleAddContextEntry}
      onRemoveContextEntry={handleRemoveContextEntry}
      onUpdateContextEntries={handleUpdateContextEntries}
    />
  );
};

const messageTypeOptions: {
  label: string;
  value: WaldiezMessageType;
}[] = [
  { label: 'None', value: 'none' },
  { label: 'Text', value: 'string' },
  { label: 'Use RAG Message Generator', value: 'rag_message_generator' },
  { label: 'Custom method', value: 'method' }
];
