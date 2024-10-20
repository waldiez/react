import React, { useEffect, useState } from 'react';

import { DictProps } from '@waldiez/components/inputs/dict/types';
import { DictView } from '@waldiez/components/inputs/dict/view';

export const Dict: React.FC<DictProps> = (props: DictProps) => {
  const {
    viewLabel,
    viewLabelInfo,
    items,
    itemsType,
    onUpdate,
    onDelete,
    onAdd,
    areValuesSecret = false
  } = props;
  const [visible, setVisible] = useState<{ [key: string]: boolean }>({});
  // tmp state to save on submit, discard on cancel
  const [stateItems, setStateItems] = useState<[string, string][]>(Object.entries(items));
  const [newEntry, setNewEntry] = useState<{ key: string; value: string }>({
    key: '',
    value: ''
  });
  useEffect(() => {
    setStateItems(Object.entries(items));
  }, [items]);
  const handleKeyChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    setStateItems(
      stateItems.map(([key, value], idx) => {
        if (idx === index) {
          return [event.target.value, value];
        }
        return [key, value];
      })
    );
  };
  const handleValueChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    setStateItems(
      stateItems.map(([key, value], idx) => {
        if (idx === index) {
          return [key, event.target.value];
        }
        return [key, value];
      })
    );
  };
  const handleVisibilityChange = (key: string) => {
    setVisible({
      ...visible,
      [key]: !visible[key]
    });
  };
  const handleAddEntry = () => {
    if (!newEntry.key || !newEntry.value) {
      return;
    }
    onAdd(newEntry.key, newEntry.value);
    setNewEntry({ key: '', value: '' });
    setStateItems([...stateItems, [newEntry.key, newEntry.value]]);
  };
  const handleNewEntryKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEntry({ ...newEntry, key: event.target.value });
  };
  const handleNewEntryValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEntry({ ...newEntry, value: event.target.value });
  };
  const handleDeleteKey = (key: string) => {
    onDelete(key);
    setStateItems(stateItems.filter(([k]) => k !== key));
  };
  const handleSave = () => {
    const itemsToSend: { [key: string]: string } = {};
    stateItems.forEach(([key, value]) => {
      itemsToSend[key] = value;
    });
    onUpdate(itemsToSend);
  };
  const isDirty = (index: number) => {
    if (index >= stateItems.length) {
      return true;
    }
    const [key, value] = stateItems[index];
    if (!(key in items)) {
      return true;
    }
    return items[key] !== value;
  };

  return (
    <DictView
      viewLabel={viewLabel}
      viewLabelInfo={viewLabelInfo}
      items={items}
      itemsType={itemsType}
      areValuesSecret={areValuesSecret}
      visible={visible}
      newEntry={newEntry}
      onNewEntryKeyChange={handleNewEntryKeyChange}
      onNewEntryValueChange={handleNewEntryValueChange}
      onKeyChange={handleKeyChange}
      onValueChange={handleValueChange}
      onVisibilityChange={handleVisibilityChange}
      onDelete={handleDeleteKey}
      onSave={handleSave}
      onAdd={handleAddEntry}
      isDirty={isDirty}
    />
  );
};
