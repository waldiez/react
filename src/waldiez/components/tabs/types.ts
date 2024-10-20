import { ReactNode } from 'react';

export type TabItemProps = {
  id: string;
  label: string;
  children: ReactNode;
};
export type TabItemsProps = {
  activeTabIndex: number;
  children: ReactNode;
};
