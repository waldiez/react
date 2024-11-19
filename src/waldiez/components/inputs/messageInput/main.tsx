import { Dict } from '@waldiez/components/inputs/dict';
import { Editor } from '@waldiez/components/inputs/editor';
import { InfoCheckbox } from '@waldiez/components/inputs/infoCheckBox';
import { InfoLabel } from '@waldiez/components/inputs/infoLabel';
import { useMessageInput } from '@waldiez/components/inputs/messageInput/hooks';
import { MessageInputProps } from '@waldiez/components/inputs/messageInput/types';
import { Select } from '@waldiez/components/inputs/select';
import { WaldiezMessageType } from '@waldiez/models';

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
    skipCarryoverOption,
    onTypeChange
  } = props;
  const {
    onContentUpdate,
    onRagProblemUpdate,
    onMethodContentUpdate,
    onUseCarryoverChange,
    onAddContextEntry,
    onRemoveContextEntry,
    onUpdateContextEntries
  } = useMessageInput(props);
  const getLabelView = () => {
    return (
      current.type !== 'none' &&
      current.type !== 'rag_message_generator' &&
      notNoneLabel &&
      (notNoneLabelInfo ? (
        <InfoLabel label={notNoneLabel} info={notNoneLabelInfo} />
      ) : (
        <label>{notNoneLabel}</label>
      ))
    );
  };
  const labelView = getLabelView();
  const useDict = includeContext && current.type !== 'rag_message_generator' && current.type !== 'none';
  const selectOptions = skipRagOption
    ? messageTypeOptions.filter(option => option.value !== 'rag_message_generator')
    : messageTypeOptions;
  return (
    <>
      <label htmlFor={`message-select-test-${selectTestId}`}>{selectLabel}</label>
      <div className="margin-bottom-5" />
      <Select
        options={selectOptions}
        value={{
          label: MessageOptionsMapping[current.type],
          value: current.type
        }}
        onChange={newValue => {
          if (newValue) {
            onTypeChange(newValue.value as WaldiezMessageType);
          } else {
            onTypeChange('none');
          }
        }}
        inputId={`message-select-test-${props.selectTestId}`}
      />
      {labelView}
      {current.type === 'string' && (
        <div className="full-width">
          <textarea
            className="fill-available"
            rows={3}
            defaultValue={current.content ?? ''}
            onChange={onContentUpdate}
            data-testid="message-text"
          />
        </div>
      )}
      {current.type === 'rag_message_generator' && (
        <div>
          <div className="info margin-bottom-20">
            Use the RAG user's `sender.message_generator` method to generate a message.
          </div>
          <label>Problem:</label>
          <div className="full-width">
            <textarea
              rows={3}
              className="fill-available"
              defaultValue={current.context.problem ?? ''}
              onChange={onRagProblemUpdate}
              data-testid="rag-message-generator-problem"
            />
          </div>
        </div>
      )}
      {current.type === 'method' && (
        <Editor
          value={current.content ?? defaultContent}
          onChange={onMethodContentUpdate}
          darkMode={darkMode}
        />
      )}
      {useDict && (
        <Dict
          items={current.context}
          itemsType="message-context"
          viewLabel="Message Context"
          viewLabelInfo="Additional context to be included."
          onAdd={onAddContextEntry}
          onDelete={onRemoveContextEntry}
          onUpdate={onUpdateContextEntries}
        />
      )}
      {!skipCarryoverOption && (current.type === 'string' || current.type === 'rag_message_generator') && (
        <InfoCheckbox
          label="Carryover "
          info={carryOverInfo}
          checked={current.use_carryover}
          dataTestId="message-use-carryover"
          onChange={onUseCarryoverChange}
        />
      )}
    </>
  );
};

const carryOverInfo = (
  <div>
    <div>This should not be checked if this is the first message in the flow.</div>
    <br />
    Append the context's last carryover to the message.
    <br />
    Example final message:
    <br />
    <pre>"Write a blogpost.\nContext:\n" + carryover</pre>
  </div>
);
const messageTypeOptions: {
  label: string;
  value: WaldiezMessageType;
}[] = [
  { label: 'None', value: 'none' },
  { label: 'Text', value: 'string' },
  { label: 'Use RAG Message Generator', value: 'rag_message_generator' },
  { label: 'Custom method', value: 'method' }
];

const MessageOptionsMapping = {
  none: 'None',
  string: 'Text',
  rag_message_generator: 'Use RAG Message Generator',
  method: 'Method'
};
