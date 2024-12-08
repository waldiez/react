import React from 'react';

export type StringListProps = {
  viewLabel: string | React.JSX.Element | (() => React.JSX.Element | string);
  viewLabelInfo?: string | React.JSX.Element | (() => React.JSX.Element | string);
  items: Array<string>;
  itemsType: string;
  onItemChange?: (oldItem: string, newItem: string) => void;
  onItemAdded?: (item: string) => void;
  onItemDeleted?: (item: string) => void;
};
