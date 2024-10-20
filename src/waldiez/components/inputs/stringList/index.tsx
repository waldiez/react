import { useState } from 'react';

import { StringListProps } from '@waldiez/components/inputs/stringList/types';
import { StringListView } from '@waldiez/components/inputs/stringList/view';

export const StringList = (props: StringListProps) => {
  const { viewLabel, viewLabelInfo, items, itemsType, onItemChange, onItemAdded, onItemDeleted } = props;
  const [newEntry, setNewEntry] = useState<string>('');
  const handleAddEntry = () => {
    if (!onItemAdded) {
      return;
    }
    if (!newEntry) {
      return;
    }
    onItemAdded(newEntry);
    setNewEntry('');
  };
  const handleDeleteItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onItemDeleted) {
      onItemDeleted(event.currentTarget.value);
    }
  };
  const handleItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dataValue = event.currentTarget.getAttribute('data-value');
    if (dataValue && onItemChange) {
      onItemChange(dataValue, event.target.value);
    }
  };
  const handleNewEntryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEntry(event.target.value);
  };
  return (
    <StringListView
      viewLabel={viewLabel}
      viewLabelInfo={viewLabelInfo}
      items={items}
      itemsType={itemsType}
      newEntry={newEntry}
      onItemChange={handleItemChange}
      onDelete={handleDeleteItem}
      onNewEntryChange={handleNewEntryChange}
      onAdd={handleAddEntry}
    />
  );
};
