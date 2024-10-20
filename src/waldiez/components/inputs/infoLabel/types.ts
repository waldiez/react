export type InfoLabelProps = {
  label: string | JSX.Element | (() => JSX.Element | string);
  info: string | JSX.Element | (() => JSX.Element | string);
};
