import { Dict } from '@waldiez/components/inputs/dict';
import { Editor } from '@waldiez/components/inputs/editor';
import { InfoCheckbox } from '@waldiez/components/inputs/infoCheckBox';
import { InfoLabel } from '@waldiez/components/inputs/infoLabel';
import { Select } from '@waldiez/components/inputs/select';
import { WaldieMessage, WaldieMessageType } from '@waldiez/models';

const MessageOptionsMapping = {
  none: 'None',
  string: 'Text',
  rag_message_generator: 'Use RAG Message Generator',
  method: 'Method'
};
export type MessageInputViewProps = {
  current: WaldieMessage;
  defaultContent: string;
  darkMode: boolean;
  selectLabel: string;
  selectOptions: { label: string; value: WaldieMessageType }[];
  selectTestId: string;
  useDict: boolean;
  notNoneLabel?: string;
  notNoneLabelInfo?: string;
  onTypeChange: (type: WaldieMessageType) => void;
  onUseCarryoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContentUpdate: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onRagProblemUpdate: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onMethodContentUpdate: (value: string | undefined) => void;
  onAddContextEntry: (key: string, value: string) => void;
  onRemoveContextEntry: (key: string) => void;
  onUpdateContextEntries: (entries: Record<string, string>) => void;
};
const carryOverInfo = (
  <div>
    Append the context's last carryover to the message.
    <br />
    Example final message:
    <br />
    <pre>"Write a blogpost.\nContext:\n" + carryover</pre>
  </div>
);
export const MessageInputView = (props: MessageInputViewProps) => {
  const {
    current,
    defaultContent,
    darkMode,
    selectLabel,
    selectOptions,
    selectTestId,
    useDict,
    notNoneLabel,
    notNoneLabelInfo,
    onTypeChange,
    onUseCarryoverChange,
    onContentUpdate,
    onRagProblemUpdate,
    onMethodContentUpdate,
    onAddContextEntry,
    onRemoveContextEntry,
    onUpdateContextEntries
  } = props;
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
  return (
    <>
      <label htmlFor={`message-select-test-${selectTestId}`}>{selectLabel}</label>
      <Select
        options={selectOptions}
        value={{
          label: MessageOptionsMapping[current.type],
          value: current.type
        }}
        onChange={newValue => {
          if (newValue) {
            onTypeChange(newValue.value as WaldieMessageType);
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
      {(current.type === 'string' || current.type === 'rag_message_generator') && (
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
