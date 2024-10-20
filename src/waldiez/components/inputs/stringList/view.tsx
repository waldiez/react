import { FaPlus, FaTrash } from 'react-icons/fa';

import { InfoLabel } from '@waldiez/components/inputs/infoLabel';
import { StringListViewProps } from '@waldiez/components/inputs/stringList/types';

export const StringListView = (props: StringListViewProps) => {
  const {
    viewLabel,
    viewLabelInfo,
    items,
    itemsType,
    newEntry,
    onItemChange,
    onDelete,
    onNewEntryChange,
    onAdd
  } = props;
  const labelElement = typeof viewLabel === 'function' ? viewLabel() : viewLabel;
  return (
    <div className="list-entries-view">
      {viewLabelInfo ? (
        <InfoLabel label={viewLabel} info={viewLabelInfo} />
      ) : (
        <label className="list-entries-label">{labelElement}</label>
      )}

      <div className="list-entries-list">
        {items?.map((item, index) => (
          <div className="list-entry" key={index}>
            <input
              type="text"
              value={item}
              data-value={item}
              onChange={onItemChange}
              data-testid={`list-entry-item-${itemsType}-${index}`}
            />
            <button
              onClick={onDelete}
              value={item}
              title="Delete"
              data-testid={`delete-list-entry-${itemsType}-${index}`}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
      <div className="add-list-entry-view">
        <input
          type="text"
          value={newEntry}
          onChange={onNewEntryChange}
          data-testid={`new-list-entry-${itemsType}-item`}
        />
        <button onClick={onAdd} title="Add" data-testid={`add-list-entry-${itemsType}-button`}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};
