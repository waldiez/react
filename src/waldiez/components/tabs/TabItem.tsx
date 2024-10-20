import React from 'react';

import { TabItemProps } from '@waldiez/components/tabs/types';

export const TabItem: React.FC<TabItemProps> = ({ id, label, children }) => {
  return (
    <div
      className="tab-panel"
      role="tabpanel"
      aria-labelledby={`${label}-Tab`}
      data-testid={`panel-${id}`}
      id={`panel-${id}`}
    >
      {children}
    </div>
  );
};

export default TabItem;
