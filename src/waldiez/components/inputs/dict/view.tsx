import { FaEye, FaEyeSlash, FaPlus, FaSave, FaTrash } from 'react-icons/fa';

import { DictViewProps } from '@waldiez/components/inputs/dict/types';
import { InfoLabel } from '@waldiez/components/inputs/infoLabel';

export const DictView = (props: DictViewProps) => {
  const {
    viewLabel,
    viewLabelInfo,
    items,
    itemsType,
    areValuesSecret,
    visible,
    newEntry,
    onNewEntryKeyChange,
    onNewEntryValueChange,
    onKeyChange,
    onValueChange,
    onVisibilityChange,
    onDelete,
    onSave,
    onAdd,
    isDirty
  } = props;
  return (
    <div className="dict-entries-view">
      {viewLabelInfo ? <InfoLabel label={viewLabel} info={viewLabelInfo} /> : <label>{viewLabel}</label>}
      <div className="dict-entries-list">
        {Object.entries(items).map(([key, value], index) => (
          <div className="dict-entry" key={key}>
            <input
              type="text"
              key={`${key}-${value}-${index}`}
              defaultValue={key}
              onChange={onKeyChange.bind(null, index)}
              data-testid={`key-input-${itemsType}-${index}`}
            />
            <input
              type={areValuesSecret ? (visible[key] ? 'text' : 'password') : 'text'}
              key={`${value}-${index}-${key}`}
              defaultValue={value}
              onChange={onValueChange.bind(null, index)}
              data-testid={`value-input-${itemsType}-${index}`}
            />
            {areValuesSecret && (
              <button
                className="visibilityWrapperBtn"
                onClick={onVisibilityChange.bind(null, key)}
                title="Toggle visibility"
                data-testid={`visibility-${itemsType}-${index}`}
              >
                {visible[key] ? <FaEyeSlash /> : <FaEye />}
              </button>
            )}
            <button
              onClick={onDelete.bind(null, key)}
              title="Delete"
              data-testid={`delete-dict-item-${itemsType}-${index}`}
            >
              <FaTrash />
            </button>
            {isDirty(index) && (
              <button onClick={onSave} title="Save" data-testid={`save-dict-item-${itemsType}-${index}`}>
                <FaSave />
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="add-dict-entry-view">
        <input
          type="text"
          placeholder="Key"
          data-testid={`new-dict-${itemsType}-key`}
          value={newEntry.key}
          onChange={onNewEntryKeyChange}
        />
        <input
          placeholder="Value"
          data-testid={`new-dict-${itemsType}-value`}
          type={areValuesSecret ? (visible['_NEW'] ? 'text' : 'password') : 'text'}
          value={newEntry.value}
          onChange={onNewEntryValueChange}
        />
        {areValuesSecret && (
          <button
            className="visibilityWrapperBtn"
            onClick={onVisibilityChange.bind(null, '_NEW')}
            title="Toggle visibility"
            data-testid={`visibility-${itemsType}-new`}
          >
            {visible['_NEW'] ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
        <button onClick={onAdd} title="Add" data-testid={`add-new-dict-${itemsType}-item`}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};
