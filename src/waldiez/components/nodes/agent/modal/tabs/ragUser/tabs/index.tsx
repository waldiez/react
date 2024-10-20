import { RagUserAgentConfigTabAdvanced } from '@waldiez/components/nodes/agent/modal/tabs/ragUser/tabs/advanced';
import { RagUserAgentConfigTabCustomFunctions } from '@waldiez/components/nodes/agent/modal/tabs/ragUser/tabs/customFunctions';
import { RagUserAgentConfigTabRetrieveConfig } from '@waldiez/components/nodes/agent/modal/tabs/ragUser/tabs/retrieveConfig';
import { RagUserAgentConfigTabTextSplit } from '@waldiez/components/nodes/agent/modal/tabs/ragUser/tabs/textSplit';
import { RagUserAgentConfigTabViewProps } from '@waldiez/components/nodes/agent/modal/tabs/ragUser/tabs/types';
import { RagUserAgentConfigTabVectorDb } from '@waldiez/components/nodes/agent/modal/tabs/ragUser/tabs/vectorDb';
import { TabItem, TabItems } from '@waldiez/components/tabs';

export const RagUserAgentConfigTabView = (props: RagUserAgentConfigTabViewProps) => {
  const {
    flowId,
    id,
    data,
    darkMode,
    filesToUpload,
    onDataChange,
    setFilesToUpload,
    onFilesUpload,
    onOpenUploadDialog,
    onFileDrop,
    onFileDragOver
  } = props;
  return (
    <div className="agent-panel agent-panel-rag-user">
      <TabItems activeTabIndex={0}>
        <TabItem label="Retrieve Config" id={`wf-${flowId}-agent-ragUser-${id}-retrieveConfig`}>
          <RagUserAgentConfigTabRetrieveConfig
            id={id}
            data={data}
            onDataChange={onDataChange}
            filesToUpload={filesToUpload}
            setFilesToUpload={setFilesToUpload}
            onFilesUpload={onFilesUpload}
            onOpenUploadDialog={onOpenUploadDialog}
            onFileDrop={onFileDrop}
            onFileDragOver={onFileDragOver}
          />
        </TabItem>
        <TabItem label="Text splitting" id={`wf-${flowId}-agent-ragUser-${id}-textSplit`}>
          <RagUserAgentConfigTabTextSplit id={id} data={data} onDataChange={onDataChange} />
        </TabItem>
        <TabItem label="Vector DB Config" id={`wf-${flowId}-agent-ragUser-${id}-vectorDb`}>
          <RagUserAgentConfigTabVectorDb id={id} data={data} onDataChange={onDataChange} />
        </TabItem>
        <TabItem label="Custom Functions" id={`wf-${flowId}-agent-ragUser-${id}-customFunctions`}>
          <RagUserAgentConfigTabCustomFunctions
            id={id}
            flowId={flowId}
            data={data}
            darkMode={darkMode}
            onDataChange={onDataChange}
          />
        </TabItem>
        <TabItem label="Advanced" id={`wf-${flowId}-agent-ragUser-${id}-advanced`}>
          <RagUserAgentConfigTabAdvanced id={id} data={data} onDataChange={onDataChange} />
        </TabItem>
      </TabItems>
    </div>
  );
};
