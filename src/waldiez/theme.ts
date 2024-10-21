import assistantSvg from '@waldiez/assets/assistant.svg';
import azure from '@waldiez/assets/logos/azure.svg';
import anthropic from '@waldiez/assets/logos/claude.svg';
import google from '@waldiez/assets/logos/gemini.svg';
import groq from '@waldiez/assets/logos/groq.svg';
import mistral from '@waldiez/assets/logos/mistral.svg';
import nim from '@waldiez/assets/logos/nim.svg';
import openai from '@waldiez/assets/logos/openai.svg';
import together from '@waldiez/assets/logos/together.svg';
import managerSvg from '@waldiez/assets/manager.svg';
import userSvg from '@waldiez/assets/user.svg';

const __THEME_STORAGE_KEY = 'waldiez_theme';

export const LOGOS = {
  openai,
  azure,
  google,
  gemini: google,
  anthropic,
  mistral,
  groq,
  together,
  nim,
  other: openai
};
export const AGENT_COLORS = {
  agent: '#005490',
  assistant: '#66bc57',
  user: '#bc76f5',
  manager: '#ed8a34',
  rag_user: '#e34561'
};
export const AGENT_ICONS = {
  user: userSvg,
  assistant: assistantSvg,
  manager: managerSvg
};

/**
 * Check if the current mode is dark
 * @returns boolean
 **/
export const isDarkMode = (flowId: string, storageId: string) => {
  // first check if the theme is set in local storage
  // in storage: {waldiez_theme: {storageId: 'dark/light'}}
  const fromLocalStorage = themeInLocalStorage(storageId);
  if (typeof fromLocalStorage === 'boolean') {
    return fromLocalStorage;
  }
  /*
    on jupyter?
        <body ... data-jp-theme-light="false"
            ... data-jp-theme-name="JupyterLab Dark" 
    */
  const fromJupyter = themeInJupyter();
  if (typeof fromJupyter === 'boolean') {
    return fromJupyter;
  }
  // already set in the root element?
  const fromRootDiv = themeInRootDiv(flowId);
  if (typeof fromRootDiv === 'boolean') {
    return fromRootDiv;
  }
  // finally check the system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * Get the themes stored in local storage
 * @returns object
 **/
const getStoredThemes = () => {
  let themes: { [key: string]: string } = {};
  const theme = window.localStorage.getItem(__THEME_STORAGE_KEY);
  if (theme) {
    try {
      themes = JSON.parse(theme);
    } catch (_) {
      window.localStorage.removeItem(__THEME_STORAGE_KEY);
    }
  }
  return themes;
};

/**
 * Set the dark mode
 **/
export const setDarkMode = (flowId: string, storageId: string, dark: boolean) => {
  const lockFile = `${__THEME_STORAGE_KEY}_${storageId}.lock`;
  if (!window.localStorage.getItem(lockFile)) {
    window.localStorage.setItem(lockFile, '1');
    const themes = getStoredThemes();
    themes[storageId] = dark ? 'dark' : 'light';
    window.localStorage.setItem(__THEME_STORAGE_KEY, JSON.stringify(themes));
    updateFlowDivClass(flowId, dark);
    setTimeout(() => {
      window.localStorage.removeItem(lockFile);
    }, 200);
  }
};

/**
 * Toggle the dark mode
 **/
export const toggleThemeMode = (flowId: string, storageId: string) => {
  const isDark = isDarkMode(flowId, storageId);
  setDarkMode(flowId, storageId, !isDark);
};

const updateFlowDivClass = (flowId: string, dark: boolean) => {
  const flowRoot = document.getElementById(`rf-root-${flowId}`);
  if (flowRoot) {
    if (dark) {
      flowRoot.classList.add('dark');
      flowRoot.classList.remove('light');
    } else {
      flowRoot.classList.add('light');
      flowRoot.classList.remove('dark');
    }
  }
};

const themeInLocalStorage = (storageId: string) => {
  const theme = window.localStorage.getItem(__THEME_STORAGE_KEY);
  if (theme) {
    try {
      const themes = JSON.parse(theme);
      if (typeof themes === 'object' && themes !== null && storageId in themes) {
        return themes[storageId] === 'dark';
      }
    } catch (_) {
      window.localStorage.removeItem(__THEME_STORAGE_KEY);
    }
  }
  return null;
};
const themeInJupyter = () => {
  const dataJpThemeLight = document.body.getAttribute('data-jp-theme-light');
  if (dataJpThemeLight === 'false') {
    return true;
  }
  if (dataJpThemeLight === 'true') {
    return false;
  }
  return null;
};
const themeInRootDiv = (flowId: string) => {
  const flowRoot = document.getElementById(`rf-root-${flowId}`);
  if (flowRoot) {
    if (flowRoot.classList.contains('dark')) {
      return true;
    }
    if (flowRoot.classList.contains('light')) {
      return false;
    }
  }
  return null;
};
