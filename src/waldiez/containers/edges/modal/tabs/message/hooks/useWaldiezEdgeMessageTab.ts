import { WaldiezEdgeMessageTabProps } from "@waldiez/containers/edges/modal/tabs/message/types";
import { WaldiezMessage, WaldiezMessageType } from "@waldiez/models";

export const useWaldiezEdgeMessageTab = (props: WaldiezEdgeMessageTabProps) => {
    const { data, onDataChange } = props;
    const onMessageTypeChange = (type: WaldiezMessageType) => {
        onDataChange({
            message: {
                ...data.message,
                type,
                use_carryover: false,
                content: null,
                context: {},
            },
        });
    };
    const onMessageChange = (message: WaldiezMessage) => {
        onDataChange({ message });
    };
    const onAddMessageContextEntry = (key: string, value: string) => {
        const messageContext = data.message.context;
        messageContext[key] = value;
        onDataChange({ message: { ...data.message, context: messageContext } });
    };
    const onRemoveMessageContextEntry = (key: string) => {
        const messageContext = data.message.context;
        delete messageContext[key];
        onDataChange({ message: { ...data.message, context: messageContext } });
    };
    const onUpdateMessageContextEntries = (entries: Record<string, string>) => {
        onDataChange({ message: { ...data.message, context: entries } });
    };
    return {
        onMessageTypeChange,
        onMessageChange,
        onAddMessageContextEntry,
        onRemoveMessageContextEntry,
        onUpdateMessageContextEntries,
    };
};
