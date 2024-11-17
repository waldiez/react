import { FaPlus, FaTrash } from 'react-icons/fa';

import { InfoLabel } from '@waldiez/components/inputs/infoLabel';
import { useStringList } from '@waldiez/components/inputs/stringList/hooks';
import { StringListProps } from '@waldiez/components/inputs/stringList/types';

export const StringList = (props: StringListProps) => {
  const { viewLabel, viewLabelInfo, items, itemsType } = props;
  const { newEntry, onAddEntry, onDeleteEntry, onEntryChange, onNewEntryChange } = useStringList(props);
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
              onChange={onEntryChange}
              data-testid={`list-entry-item-${itemsType}-${index}`}
            />
            <button
              onClick={onDeleteEntry}
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
        <button onClick={onAddEntry} title="Add" data-testid={`add-list-entry-${itemsType}-button`}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};