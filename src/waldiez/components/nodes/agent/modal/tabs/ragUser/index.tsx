import { RagUserAgentConfigTabView } from '@waldiez/components/nodes/agent/modal/tabs/ragUser/tabs';
import { RagUserAgentConfigTabProps } from '@waldiez/components/nodes/agent/modal/tabs/ragUser/types';
import { showSnackbar } from '@waldiez/components/snackbar';
import { WaldieNodeRagUserData } from '@waldiez/models';

export const RagUserAgentConfigTab = (props: RagUserAgentConfigTabProps) => {
  const { flowId, id, data, darkMode, uploadEnabled, filesToUpload, setFilesToUpload, onDataChange } = props;
  const setRetrieveConfigConfigData = (partialData: Partial<WaldieNodeRagUserData['retrieveConfig']>) => {
    onDataChange({
      ...data,
      retrieveConfig: {
        ...data.retrieveConfig,
        ...partialData
      }
    });
  };
  const isValidFile = (file: File) => {
    const extension = file.name.split('.').pop();
    if (!extension || !allowedFileExtensions.includes(`.${extension}`)) {
      showSnackbar(flowId, 'Invalid file extension. Please upload a valid file.', 'error');
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      showSnackbar(flowId, 'File size limit exceeded. Maximum file size is 10MB.', 'error');
      return false;
    }
    return true;
  };

  const handleFilesUpload = (files: File[]) => {
    const docsPath = data.retrieveConfig.docsPath;
    const newDocsPath = [...docsPath];
    const newFilesToUpload = [...filesToUpload];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!isValidFile(file)) {
        continue;
      }
      // if not added already
      if (filesToUpload.indexOf(file) === -1) {
        newDocsPath.push(`file:///${file.name}`);
        newFilesToUpload.push(file);
      }
    }
    setRetrieveConfigConfigData({ docsPath: newDocsPath });
  };
  const onFilesUpload = uploadEnabled ? handleFilesUpload : undefined;
  const onOpenUploadDialog = () => {
    if (uploadEnabled) {
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = true;
      input.id = 'rag-file-upload';
      input.style.display = 'none';
      input.accept = allowedFileExtensions.join(',');
      input.onchange = event => {
        if (event.target instanceof HTMLInputElement && event.target.files && event.target.files.length) {
          handleFilesUpload(Array.from(event.target.files));
        }
        input.remove();
      };
      input.click();
    }
  };
  const onFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files.length > 0) {
      // only allow accepted file extensions
      const files = Array.from(event.dataTransfer.files).filter(file =>
        allowedFileExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
      );
      handleFilesUpload(files);
    }
  };
  const onFileDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <RagUserAgentConfigTabView
      flowId={flowId}
      id={id}
      data={data}
      darkMode={darkMode}
      filesToUpload={filesToUpload}
      setFilesToUpload={setFilesToUpload}
      onDataChange={onDataChange}
      onFileDrop={onFileDrop}
      onFileDragOver={onFileDragOver}
      onOpenUploadDialog={onOpenUploadDialog}
      onFilesUpload={onFilesUpload}
    />
  );
};
const allowedFileExtensions = [
  '.txt',
  '.pdf',
  '.doc',
  '.docx',
  '.rtf',
  '.xlsx',
  '.xls',
  '.csv',
  '.json',
  '.yaml',
  '.yml',
  '.xml',
  '.md',
  '.odt'
];
