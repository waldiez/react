import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { isDarkMode, setDarkMode, toggleThemeMode } from '@waldiez/theme';

const STORAGE_KEY = 'waldiez_theme';

describe('theme', () => {
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
  const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');

  beforeEach(() => {
    getItemSpy.mockClear();
    setItemSpy.mockClear();
    removeItemSpy.mockClear();
  });

  afterEach(() => {
    getItemSpy.mockClear();
    setItemSpy.mockClear();
    removeItemSpy.mockClear();
    document.body.classList.remove('waldiez-light');
    document.body.classList.remove('waldiez-dark');
  });

  it('should return storage value', () => {
    getItemSpy.mockReturnValueOnce('{"test": "dark"}');
    expect(isDarkMode('test', 'test')).toBe(true);
    expect(getItemSpy).toBeCalledTimes(1);
    expect(getItemSpy).toBeCalledWith(STORAGE_KEY);
  });

  it('should set dark mode', () => {
    const flowRoot = document.createElement('div');
    flowRoot.id = 'rf-root-test';
    document.body.appendChild(flowRoot);
    setDarkMode('test', 'test', true);
    expect(setItemSpy).toBeCalledTimes(2);
    expect(setItemSpy).toHaveBeenNthCalledWith(1, 'waldiez_theme_test.lock', '1');
    expect(setItemSpy).toHaveBeenNthCalledWith(2, 'waldiez_theme', '{"test":"dark"}');
    expect(flowRoot.classList.contains('dark')).toBe(true);
    expect(flowRoot.classList.contains('light')).toBe(false);
    vi.advanceTimersByTime(1000);
    expect(removeItemSpy).toBeCalledTimes(1);
    document.body.removeChild(flowRoot);
  });

  it('should toggle theme mode', () => {
    const flowRoot = document.createElement('div');
    flowRoot.id = 'rf-root-test';
    document.body.appendChild(flowRoot);
    getItemSpy.mockReturnValueOnce('{"test": "dark"}');
    toggleThemeMode('test', 'test');
    expect(setItemSpy).toBeCalledTimes(2);
    expect(setItemSpy).toHaveBeenNthCalledWith(1, 'waldiez_theme_test.lock', '1');
    expect(setItemSpy).toHaveBeenNthCalledWith(2, 'waldiez_theme', '{"test":"light"}');
    expect(flowRoot.classList.contains('dark')).toBe(false);
    expect(flowRoot.classList.contains('light')).toBe(true);
    vi.advanceTimersByTime(1000);
    expect(removeItemSpy).toBeCalledTimes(1);
    document.body.removeChild(flowRoot);
  });

  it('should handle invalid storage value', () => {
    getItemSpy.mockReturnValueOnce('invalid');
    expect(isDarkMode('test', 'test')).toBe(false);
    expect(getItemSpy).toBeCalledTimes(1);
    expect(getItemSpy).toBeCalledWith(STORAGE_KEY);
    expect(removeItemSpy).toBeCalledTimes(1);
  });

  it('should handle invalid storage value on set', () => {
    // we need the second call on getItem, the first one is for lock
    getItemSpy.mockReturnValueOnce(null).mockReturnValueOnce('invalid');
    setDarkMode('test', 'test', true);
    expect(getItemSpy).toBeCalledTimes(2);
    getItemSpy.mockReset();
  });

  it('should use data-jp-theme-light false attribute', () => {
    document.body.setAttribute('data-jp-theme-light', 'false');
    expect(isDarkMode('test', 'test')).toBe(true);
    document.body.removeAttribute('data-jp-theme-light');
  });

  it('should use data-jp-theme-light true attribute', () => {
    document.body.setAttribute('data-jp-theme-light', 'true');
    expect(isDarkMode('test', 'test')).toBe(false);
    document.body.removeAttribute('data-jp-theme-light');
  });

  it('should use root element class', () => {
    const flowRoot = document.createElement('div');
    flowRoot.id = 'rf-root-test';
    flowRoot.classList.add('dark');
    document.body.appendChild(flowRoot);
    expect(isDarkMode('test', 'test')).toBe(true);
    document.body.removeChild(flowRoot);
  });

  it('should use the body class if set', () => {
    document.body.classList.add('waldiez-dark');
    expect(isDarkMode('test', 'test')).toBe(true);
    document.body.classList.remove('waldiez-dark');
    document.body.classList.add('waldiez-light');
    expect(isDarkMode('test', 'test')).toBe(false);
    document.body.classList.remove('waldiez-light');
  });
});
