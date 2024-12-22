import { WaldiezNodeData, WaldiezNodeRagUserData } from "@waldiez/models";

export const useWaldiezAgentRagUserAdvanced = (props: {
    data: WaldiezNodeRagUserData;
    onDataChange: (data: WaldiezNodeData) => void;
}) => {
    const { data, onDataChange } = props;
    const setRetrieveConfigConfigData = (partialData: Partial<WaldiezNodeRagUserData["retrieveConfig"]>) => {
        onDataChange({
            ...data,
            retrieveConfig: {
                ...data.retrieveConfig,
                ...partialData,
            },
        });
    };
    const onCustomizedPromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRetrieveConfigConfigData({
            customizedPrompt: event.target.value,
        });
    };
    const onCustomizedAnswerPrefixChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRetrieveConfigConfigData({
            customizedAnswerPrefix: event.target.value,
        });
    };
    const onUpdateContextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRetrieveConfigConfigData({
            updateContext: event.target.checked,
        });
    };
    const onGetOrCreateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRetrieveConfigConfigData({
            getOrCreate: event.target.checked,
        });
    };
    const onNewDocsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRetrieveConfigConfigData({
            newDocs: event.target.checked,
        });
    };
    const onOverwriteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRetrieveConfigConfigData({
            overwrite: event.target.checked,
        });
    };
    const onRecursiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRetrieveConfigConfigData({
            recursive: event.target.checked,
        });
    };
    return {
        onCustomizedPromptChange,
        onCustomizedAnswerPrefixChange,
        onUpdateContextChange,
        onGetOrCreateChange,
        onNewDocsChange,
        onOverwriteChange,
        onRecursiveChange,
    };
};
