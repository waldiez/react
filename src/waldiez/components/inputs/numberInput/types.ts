export type NumberInputProps = {
  label: string | JSX.Element;
  value: number | null;
  min: number;
  max: number;
  onChange: (value: number | null) => void;
  forceInt?: boolean;
  onNull?: number;
  onUpperLabel?: string | null;
  onLowerLabel?: string | null;
  setNullOnUpper?: boolean;
  setNullOnLower?: boolean;
  step?: number;
  stepDownScale?: number;
  disabled?: boolean;
  labelInfo?: string | JSX.Element | null;
  dataTestId?: string;
};
