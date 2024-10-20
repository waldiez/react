const __SIDEBAR_STORAGE_KEY = 'waldiez_sidebar';

export const downloadFlow = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileName}.waldiez`;
  a.click();
  URL.revokeObjectURL(url);
};
export const getInitialSidebarState = (storageId: string) => {
  // from local storage
  const storageValue = localStorage.getItem(__SIDEBAR_STORAGE_KEY);
  if (storageValue) {
    try {
      const sidebars = JSON.parse(storageValue);
      if (typeof sidebars === 'object' && sidebars !== null && storageId in sidebars) {
        return sidebars[storageId] === 'true';
      }
    } catch (_) {
      localStorage.removeItem(__SIDEBAR_STORAGE_KEY);
    }
  }
  return false;
};

const getStoredSidebarStates = () => {
  let sidebars: { [key: string]: string } = {};
  const storageValue = localStorage.getItem(__SIDEBAR_STORAGE_KEY);
  if (storageValue) {
    try {
      sidebars = JSON.parse(storageValue);
    } catch (_) {
      localStorage.removeItem(__SIDEBAR_STORAGE_KEY);
    }
  }
  return sidebars;
};

export const storeSidebarState = (storageId: string, isCollapsed: boolean) => {
  const lockFile = `waldiez_sidebar_${storageId}.lock`;
  if (!window.localStorage.getItem(lockFile)) {
    window.localStorage.setItem(lockFile, '1');
    const sidebars = getStoredSidebarStates();
    sidebars[storageId] = isCollapsed.toString();
    localStorage.setItem(__SIDEBAR_STORAGE_KEY, JSON.stringify(sidebars));
    setTimeout(() => {
      window.localStorage.removeItem(lockFile);
    }, 200);
  }
};
