import { SingleValue } from "@waldiez/components";
import { WaldiezAgentHumanInputMode, WaldiezNodeAgentData } from "@waldiez/models";

export const useWaldiezAgentBasic = (props: {
    onDataChange: (data: Partial<WaldiezNodeAgentData>) => void;
    onAgentTypeChange: (agentType: "rag_user" | "user") => void;
}) => {
    const { onDataChange, onAgentTypeChange } = props;
    const onRagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAgentType = event.target.checked ? "rag_user" : "user";
        onAgentTypeChange(newAgentType);
    };
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onDataChange({ label: event.target.value });
    };
    const onDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onDataChange({ description: event.target.value });
    };
    const onSystemMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onDataChange({ systemMessage: event.target.value });
    };
    const onHumanInputModeChange = (
        option: SingleValue<{ label: string; value: WaldiezAgentHumanInputMode }>,
    ) => {
        if (option) {
            onDataChange({ humanInputMode: option.value });
        }
    };
    const onMaxConsecutiveAutoReplyChange = (value: number | null) => {
        onDataChange({ maxConsecutiveAutoReply: value });
    };
    const onAgentDefaultAutoReplyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onDataChange({ agentDefaultAutoReply: event.target.value });
    };
    return {
        onRagChange,
        onNameChange,
        onDescriptionChange,
        onSystemMessageChange,
        onHumanInputModeChange,
        onMaxConsecutiveAutoReplyChange,
        onAgentDefaultAutoReplyChange,
    };
};
