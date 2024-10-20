export type StringListProps = {
  viewLabel: string | JSX.Element | (() => JSX.Element | string);
  viewLabelInfo?: string | JSX.Element | (() => JSX.Element | string);
  items: Array<string>;
  itemsType: string;
  onItemChange?: (oldItem: string, newItem: string) => void;
  onItemAdded?: (item: string) => void;
  onItemDeleted?: (item: string) => void;
};
export type StringListViewProps = {
  viewLabel: string | JSX.Element | (() => JSX.Element | string);
  viewLabelInfo?: string | JSX.Element | (() => JSX.Element | string);
  items: string[];
  itemsType: string;
  newEntry: string;
  onItemChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onNewEntryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
};
