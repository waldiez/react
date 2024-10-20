import { FaFileExport, FaFileImport } from 'react-icons/fa';

import { WaldieNode } from '@waldiez/models';

export const getImportExportView: (
  flowId: string,
  itemId: string,
  itemType: 'model' | 'skill' | 'agent',
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onExport: () => void
) => React.ReactNode = (flowId, itemId, itemType, onImport, onExport) => {
  const itemTypeLower = itemType.toLowerCase();
  const itemTypeCapitalized = itemType.charAt(0).toUpperCase() + itemType.slice(1);
  return (
    <div className="modal-header-import-export">
      <input
        id={`file-upload-${itemTypeLower}-${flowId}-${itemId}`}
        data-testid={`file-upload-${itemTypeLower}-${flowId}-${itemId}`}
        type="file"
        accept={`.waldie${itemTypeCapitalized}`}
        onChange={onImport}
        className="hidden"
      />
      <label
        htmlFor={`file-upload-${itemTypeLower}-${flowId}-${itemId}`}
        className="modal-header-import-button file-label"
        title={`Import ${itemTypeCapitalized}`}
      >
        <FaFileImport />
      </label>
      <button
        className="modal-header-export-button"
        onClick={onExport}
        title={`Export ${itemTypeCapitalized}`}
        data-testid={`export-${itemTypeLower}-${flowId}-${itemId}`}
      >
        <FaFileExport />
      </button>
    </div>
  );
};
const openDownloadLink = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
export const exportItem = (
  name: string,
  itemType: 'model' | 'skill' | 'agent',
  exporter: () => { [key: string]: unknown } | null
) => {
  const item = exporter();
  if (item) {
    const itemTypeCapitalized = itemType.charAt(0).toUpperCase() + itemType.slice(1);
    const itemString = JSON.stringify(item, null, 2);
    const blob = new Blob([itemString], { type: 'application/json' });
    openDownloadLink(blob, `${name}.waldie${itemTypeCapitalized}`);
  }
};

export const importItem = (
  event: React.ChangeEvent<HTMLInputElement>,
  itemGetter: () => WaldieNode | null,
  onLoad: (item: WaldieNode, data: { [key: string]: unknown }) => void
) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const item = itemGetter();
      if (item) {
        const result = reader.result as string;
        try {
          const jsonData = JSON.parse(result);
          onLoad(item, jsonData);
        } catch (e) {
          console.error(e);
        }
      }
    };
    reader.readAsText(file);
  }
};
