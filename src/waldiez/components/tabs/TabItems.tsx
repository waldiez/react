import React, { ReactElement, useState } from 'react';

import { TabItem } from '@waldiez/components/tabs/TabItem';
import { TabItemProps, TabItemsProps } from '@waldiez/components/tabs/types';

export const TabItems = (props: TabItemsProps) => {
  const { activeTabIndex, children } = props;
  const [activeTab, setActiveTab] = useState(activeTabIndex);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  const tabs = React.Children.toArray(children).filter(
    (child): child is ReactElement<TabItemProps> => React.isValidElement(child) && child.type === TabItem
  );
  return (
    <div className="tabs">
      <nav className="tab-list-wrapper">
        <ul className="tab-list" role="tablist" aria-orientation="horizontal">
          {tabs.map((tab, index) => {
            const className = activeTab === index ? 'tab-btn--active' : '';
            return (
              <li key={`tab-li-${tab.props.id}-${index}`}>
                <button
                  key={`tab-btn-${tab.props.id}-${index}`}
                  role="tab"
                  data-testid={`tab-id-${tab.props.id}`}
                  id={`tab-id-${tab.props.id}`}
                  aria-controls={`panel-${tab.props.id}`}
                  aria-selected={activeTab === index}
                  onClick={handleTabClick.bind(null, index)}
                  className={`tab-btn ${className}`}
                >
                  {tab.props.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      {tabs[activeTab]}
    </div>
  );
};
