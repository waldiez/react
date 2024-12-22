import { ReactNode } from "react";

export type CollapsibleProps = {
    title: string;
    children: ReactNode;
    expanded?: boolean;
    dataTestId?: string;
};
export type CollapsibleViewProps = {
    title: string;
    children: ReactNode;
    isOpen: boolean;
    dataTestId?: string;
    onToggle: () => void;
};
