import React from "react";

export type TextInputProps = {
    label: string | React.JSX.Element;
    value: string | null;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onNull?: string;
    disabled?: boolean;
    labelInfo?: string | React.JSX.Element;
    dataTestId?: string;
};
