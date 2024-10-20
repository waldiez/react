export type DictProps = {
  viewLabel: string;
  viewLabelInfo?: string;
  items: { [key: string]: string };
  itemsType: string;
  onUpdate: (items: { [key: string]: string }) => void;
  onDelete: (key: string) => void;
  onAdd: (key: string, value: string) => void;
  areValuesSecret?: boolean;
};
export type DictViewProps = {
  viewLabel: string;
  viewLabelInfo?: string;
  items: { [key: string]: string };
  itemsType: string;
  areValuesSecret?: boolean;
  visible: { [key: string]: boolean };
  newEntry: { key: string; value: string };
  onNewEntryKeyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onNewEntryValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  onVisibilityChange: (key: string) => void;
  onDelete: (key: string) => void;
  onSave: () => void;
  onAdd: () => void;
  isDirty: (index: number) => boolean;
};
