import React from 'react';

export type InfoLabelProps = {
  label: string | React.JSX.Element | (() => React.JSX.Element | string);
  info: string | React.JSX.Element | (() => React.JSX.Element | string);
};
