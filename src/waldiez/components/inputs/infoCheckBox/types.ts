import { ChangeEvent } from 'react';

export type InfoCheckboxProps = {
  label: string | JSX.Element | (() => JSX.Element | string);
  info: string | JSX.Element | (() => JSX.Element | string);
  checked: boolean;
  dataTestId: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
