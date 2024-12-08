const __SIDEBAR_STORAGE_KEY = 'waldiez_sidebar';

/**
 * Get the initial state of the sidebar from local storage.
 * @param storageId - The id of the sidebar
 * @returns boolean
 */
export const isSidebarCollapsed = (storageId: string) => {
  const fromBody = getIsSidebarCollapsedFromBody();
  if (typeof fromBody === 'boolean') {
    return fromBody;
  }
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
 * @param force - Force the state of the sidebar
 */
export const setSidebarCollapsed = (storageId: string, isCollapsed: boolean, force: boolean = false) => {
  const lockFile = `waldiez_sidebar_${storageId}.lock`;
  if (!window.localStorage.getItem(lockFile) || force) {
    window.localStorage.setItem(lockFile, '1');
    setSidebarCollapsedToBody(isCollapsed);
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

/**
 * Get the initial state of the sidebar from the body class.
 * @returns boolean | undefined
 */
const getIsSidebarCollapsedFromBody = () => {
  if (document.body.classList.contains('waldiez-sidebar-collapsed')) {
    return true;
  }
  if (document.body.classList.contains('waldiez-sidebar-expanded')) {
    return false;
  }
  return undefined;
};

/**
 * Set the state of the sidebar to the body class.
 * @param isCollapsed - The state of the sidebar
 */
const setSidebarCollapsedToBody = (isCollapsed: boolean) => {
  if (isCollapsed) {
    document.body.classList.add('waldiez-sidebar-collapsed');
    document.body.classList.remove('waldiez-sidebar-expanded');
  } else {
    document.body.classList.add('waldiez-sidebar-expanded');
    document.body.classList.remove('waldiez-sidebar-collapsed');
  }
};
