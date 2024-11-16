const __SIDEBAR_STORAGE_KEY = 'waldiez_sidebar';

/**
 * Get the initial state of the sidebar from local storage.
 * @param storageId - The id of the sidebar
 * @returns boolean
 */
export const isSidebarCollapsed = (storageId: string) => {
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

/**
 * Store the state of the sidebar in local storage.
 * @param storageId - The id of the sidebar
 * @param isCollapsed - The state of the sidebar
 */
export const setSidebarCollapsed = (storageId: string, isCollapsed: boolean) => {
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

/**
 * Get the sidebar states stored in local storage.
 * @returns object
 */
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
