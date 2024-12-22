export type DictProps = {
    viewLabel: string;
    viewLabelInfo?: string;
    items: { [key: string]: string };
    itemsType: string;
    onUpdate: (items: { [key: string]: string }) => void;
    onDelete: (key: string) => void;
    onAdd: (key: string, value: string) => void;
    areValuesSecret?: boolean;
};
