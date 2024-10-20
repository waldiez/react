export type TextInputProps = {
  label: string | JSX.Element;
  value: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onNull?: string;
  disabled?: boolean;
  labelInfo?: string | JSX.Element;
  dataTestId?: string;
};
