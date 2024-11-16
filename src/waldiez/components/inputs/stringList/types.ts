export type StringListProps = {
  viewLabel: string | JSX.Element | (() => JSX.Element | string);
  viewLabelInfo?: string | JSX.Element | (() => JSX.Element | string);
  items: Array<string>;
  itemsType: string;
  onItemChange?: (oldItem: string, newItem: string) => void;
  onItemAdded?: (item: string) => void;
  onItemDeleted?: (item: string) => void;
};
