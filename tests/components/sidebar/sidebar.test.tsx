import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SideBar } from '@waldiez/components/sidebar';

const onNodeTypeSelected = vi.fn();
const onThemeToggle = vi.fn();
const onEditFlow = vi.fn();
const onImport = vi.fn();
const getFlow = vi.fn();
const flowId = 'test';
const name = 'test-flow';
const storageId = 'test-storage';

const sideBarProps = {
  flowId,
  name,
  storageId,
  darkMode: true,
  rfInstance: null,
  onNodeTypeSelected,
  onThemeToggle,
  onEditFlow,
  onImport,
  getFlow
};

describe('SideBar', () => {
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
  const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');

  beforeEach(() => {
    getItemSpy.mockClear();
    setItemSpy.mockClear();
    removeItemSpy.mockClear();
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    localStorage.clear();
    getItemSpy.mockClear();
    setItemSpy.mockClear();
    removeItemSpy.mockClear();
    vi.resetAllMocks();
    vi.useRealTimers();
  });

  it('should render successfully', () => {
    const { baseElement } = render(<SideBar {...sideBarProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render with isCollapsed', () => {
    const sideBarPropsCollapsed = {
      ...sideBarProps,
      isCollapsed: true
    };
    const { baseElement } = render(<SideBar {...sideBarPropsCollapsed} />);
    expect(baseElement).toBeTruthy();
  });

  it('should call onEditFlow', () => {
    render(<SideBar {...sideBarProps} />);
    fireEvent.click(screen.getByTestId('edit-flow'));
    expect(onEditFlow).toBeCalledTimes(1);
  });

  it('should call onThemeToggle', () => {
    render(<SideBar {...sideBarProps} />);
    fireEvent.click(screen.getByTestId('theme-toggle'));
    expect(onThemeToggle).toBeCalledTimes(1);
  });

  it('should call onImportFlow', async () => {
    const onImportLocal = vi.fn();
    const sideBarPropsWithImport = {
      ...sideBarProps,
      onImport: onImportLocal
    };
    render(<SideBar {...sideBarPropsWithImport} />);
    const importInput = screen.getByTestId('import-flow-test');
    await userEvent.upload(importInput, [new File([JSON.stringify({})], 'test.waldiez')]);
    expect(onImportLocal).toBeCalledTimes(1);
  });

  it('should call onExportFlow', () => {
    render(<SideBar {...sideBarProps} />);
    fireEvent.click(screen.getByTestId('export-flow-test'));
  });

  it('should call onNodeTypeSelected with agent', () => {
    const onNodeTypeSelectedLocal = vi.fn();
    const sideBarPropsWithNodeType = {
      ...sideBarProps,
      onNodeTypeSelected: onNodeTypeSelectedLocal
    };
    render(<SideBar {...sideBarPropsWithNodeType} />);
    fireEvent.click(screen.getByTestId('show-agents'));
    expect(onNodeTypeSelectedLocal).toBeCalledTimes(1);
  });

  it('should call onNodeTypeSelected with model', () => {
    const onNodeTypeSelectedLocal = vi.fn();
    const sideBarPropsWithNodeType = {
      ...sideBarProps,
      onNodeTypeSelected: onNodeTypeSelectedLocal
    };
    render(<SideBar {...sideBarPropsWithNodeType} />);
    fireEvent.click(screen.getByTestId('show-models'));
    expect(onNodeTypeSelectedLocal).toBeCalledTimes(1);
  });

  it('should call onNodeTypeSelected with skill', () => {
    const onNodeTypeSelectedLocal = vi.fn();
    const sideBarPropsWithNodeType = {
      ...sideBarProps,
      onNodeTypeSelected: onNodeTypeSelectedLocal
    };
    render(<SideBar {...sideBarPropsWithNodeType} />);
    fireEvent.click(screen.getByTestId('show-skills'));
    expect(onNodeTypeSelectedLocal).toBeCalledTimes(1);
  });

  it('should use initial isCollapsed state', () => {
    getItemSpy.mockReturnValueOnce('{"test":true}');
    render(<SideBar {...sideBarProps} />);
    expect(getItemSpy).toBeCalledWith('waldiez_sidebar');
  });

  it('should handle invalid storage value', () => {
    getItemSpy.mockReturnValueOnce('invalid');
    render(<SideBar {...sideBarProps} />);
    expect(getItemSpy).toBeCalledWith('waldiez_sidebar');
    expect(getItemSpy).toBeCalledTimes(2);
    expect(localStorage.getItem('waldiez_sidebar')).toBeUndefined();
  });

  it('should store isCollapsed state', () => {
    getItemSpy
      .mockReturnValueOnce('{"test-storage":"true"}')
      .mockReturnValueOnce('{"test-storage":"true"}')
      .mockReturnValueOnce(null) // for lock
      .mockReturnValueOnce('{"test-storage":"true"}');

    const rootDiv = document.createElement('div');
    rootDiv.id = 'rf-root-test';
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');
    rootDiv.appendChild(sidebar);
    document.body.appendChild(rootDiv);
    render(<SideBar {...sideBarProps} />);
    fireEvent.click(screen.getByTestId('sidebar-toggle'));
    expect(setItemSpy).toBeCalledTimes(2);
    expect(setItemSpy).toBeCalledWith('waldiez_sidebar', '{"test-storage":"false"}');
    vi.advanceTimersByTime(300);
    document.body.removeChild(rootDiv);
  });

  it('should store isCollapsed state with invalid storage value', () => {
    getItemSpy
      .mockReturnValueOnce('{"test-storage":"true"}')
      .mockReturnValueOnce('{"test-storage":"true"}')
      .mockReturnValueOnce(null) // for lock
      .mockReturnValueOnce('invalid');

    const rootDiv = document.createElement('div');
    rootDiv.id = 'rf-root-test';
    document.body.appendChild(rootDiv);
    render(<SideBar {...sideBarProps} />);
    fireEvent.click(screen.getByTestId('sidebar-toggle'));
    expect(setItemSpy).toBeCalledTimes(2);
    expect(setItemSpy).toBeCalledWith('waldiez_sidebar', '{"test-storage":"false"}');
    vi.advanceTimersByTime(300);
    document.body.removeChild(rootDiv);
  });

  it('should handle drag start', () => {
    const rootDiv = document.createElement('div');
    rootDiv.id = 'rf-root-test-flow';
    document.body.appendChild(rootDiv);
    render(<SideBar {...sideBarProps} />);
    fireEvent.dragStart(screen.getByTestId('user-dnd'), {
      dataTransfer: { setData: vi.fn() }
    });
    fireEvent.dragStart(screen.getByTestId('assistant-dnd'), {
      dataTransfer: { setData: vi.fn() }
    });
    fireEvent.dragStart(screen.getByTestId('manager-dnd'), {
      dataTransfer: { setData: vi.fn() }
    });
    document.body.removeChild(rootDiv);
  });
});
