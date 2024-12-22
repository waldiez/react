import {
    WaldiezAgentRagUserAdvanced,
    WaldiezAgentRagUserCustomFunctions,
    WaldiezAgentRagUserRetrieveConfig,
    WaldiezAgentRagUserTextSplit,
    WaldiezAgentRagUserVectorDb,
} from "@waldiez/components/nodes/agent/modal/tabs/ragUser/tabs";
import { WaldiezAgentRagUserProps } from "@waldiez/components/nodes/agent/modal/tabs/ragUser/types";
import { TabItem, TabItems } from "@waldiez/components/tabs";

export const WaldiezAgentRagUser = (props: WaldiezAgentRagUserProps) => {
    const {
        id,
        data,
        flowId,
        isDarkMode,
        onDataChange,
        filesToUpload,
        onFilesToUploadChange,
        uploadsEnabled,
    } = props;
    return (
        <div className="agent-panel agent-ragUser-panel margin-bottom-10">
            <TabItems activeTabIndex={0}>
                <TabItem label="Retrieve Config" id={`wf-${flowId}-agent-ragUser-${id}-retrieveConfig`}>
                    <WaldiezAgentRagUserRetrieveConfig
                        id={id}
                        flowId={flowId}
                        data={data}
                        onDataChange={onDataChange}
                        uploadsEnabled={uploadsEnabled}
                        filesToUpload={filesToUpload}
                        onFilesToUploadChange={onFilesToUploadChange}
                    />
                </TabItem>
                <TabItem label="Text splitting" id={`wf-${flowId}-agent-ragUser-${id}-textSplit`}>
                    <WaldiezAgentRagUserTextSplit id={id} data={data} onDataChange={onDataChange} />
                </TabItem>
                <TabItem label="Vector DB Config" id={`wf-${flowId}-agent-ragUser-${id}-vectorDb`}>
                    <WaldiezAgentRagUserVectorDb id={id} data={data} onDataChange={onDataChange} />
                </TabItem>
                <TabItem label="Custom Functions" id={`wf-${flowId}-agent-ragUser-${id}-customFunctions`}>
                    <WaldiezAgentRagUserCustomFunctions
                        id={id}
                        flowId={flowId}
                        data={data}
                        isDarkMode={isDarkMode}
                        onDataChange={onDataChange}
                    />
                </TabItem>
                <TabItem label="Advanced" id={`wf-${flowId}-agent-ragUser-${id}-advanced`}>
                    <WaldiezAgentRagUserAdvanced id={id} data={data} onDataChange={onDataChange} />
                </TabItem>
            </TabItems>
        </div>
    );
};
