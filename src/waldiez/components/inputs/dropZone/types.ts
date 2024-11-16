export type DropZoneProps = {
  flowId: string;
  onUpload: (files: File[]) => void;
  allowedFileExtensions: string[];
  multiple?: boolean;
};
