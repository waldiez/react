import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SideBar } from '@waldiez/components/sidebar';
import { SideBarProps } from '@waldiez/components/sidebar/types';
import { WaldiezProvider } from '@waldiez/store';
import { isSidebarCollapsed } from '@waldiez/utils/storage';

const flowId = 'test';
const storageId = 'test-storage';
const createdAt = new Date().toISOString();
const updatedAt = new Date().toISOString();
const onTypeShownChange = vi.fn();
const onThemeToggle = vi.fn();

const sideBarProps: SideBarProps = {
  darkMode: true,
  typeShown: 'agent',
  onThemeToggle,
  onTypeShownChange
};

const renderSidebar = (props: SideBarProps = sideBarProps) => {
  render(
    <WaldiezProvider
      flowId={flowId}
      storageId={storageId}
      name="Test Flow"
      description="Test Description"
      requirements={['Test Requirement']}
      tags={['Test Tag']}
      nodes={[]}
      edges={[]}
      viewport={{ zoom: 1, x: 50, y: 50 }}
      createdAt={createdAt}
      updatedAt={updatedAt}
    >
      <SideBar {...props} />
    </WaldiezProvider>
  );
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
    document.body.classList.remove('waldiez-sidebar-collapsed');
    document.body.classList.remove('waldiez-sidebar-expanded');
  });

  it('should render successfully', () => {
    renderSidebar();
    const sidebar = screen.getByTestId(`sidebar-${flowId}`);
    expect(sidebar).toBeTruthy();
    expect(sidebar).not.toHaveClass('sidebar collapsed');
  });

  it('should render with isCollapsed', () => {
    getItemSpy.mockReturnValue(`{"${storageId}":"true"}`);
    renderSidebar();
    const sidebar = screen.getByTestId(`sidebar-${flowId}`);
    expect(sidebar).toBeTruthy();
    expect(sidebar).toHaveClass('sidebar collapsed', { exact: true });
  });

  it('should get the state of the sidebar from the body class', () => {
    document.body.classList.add('waldiez-sidebar-collapsed');
    expect(getItemSpy).toBeCalledTimes(0);
    expect(isSidebarCollapsed(storageId)).toBe(true);
    document.body.classList.remove('waldiez-sidebar-collapsed');
    document.body.classList.add('waldiez-sidebar-expanded');
    expect(isSidebarCollapsed(storageId)).toBe(false);
    document.body.classList.remove('waldiez-sidebar-expanded');
    getItemSpy.mockReturnValueOnce(`{"${storageId}":"true"}`);
    expect(isSidebarCollapsed(storageId)).toBe(true);
  });

  it('should call onEditFlow', () => {
    renderSidebar();
    expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId(`edit-flow-${flowId}-sidebar-button`));
    expect(HTMLDialogElement.prototype.showModal).toBeCalledTimes(1);
  });

  it('should call onThemeToggle', () => {
    renderSidebar();
    fireEvent.click(screen.getByTestId('theme-toggle'));
    expect(onThemeToggle).toBeCalledTimes(1);
  });

  it('should call onImportFlow', async () => {
    renderSidebar();
    expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId(`import-flow-${flowId}-sidebar-button`));
    expect(HTMLDialogElement.prototype.showModal).toBeCalledTimes(1);
  });

  it('should call onExportFlow', () => {
    renderSidebar();
    expect(HTMLAnchorElement.prototype.click).toBeCalledTimes(0);
    fireEvent.click(screen.getByTestId(`export-flow-${flowId}-sidebar-button`));
    expect(HTMLAnchorElement.prototype.click).toBeCalledTimes(1);
  });

  it('should call onNodeTypeSelected with agent', () => {
    const onTypeShownChangeLocal = vi.fn();
    const sideBarPropsWithNodeType = {
      ...sideBarProps,
      onTypeShownChange: onTypeShownChangeLocal
    };
    renderSidebar(sideBarPropsWithNodeType);
    fireEvent.click(screen.getByTestId('show-agents'));
    expect(onTypeShownChangeLocal).toBeCalledTimes(1);
  });

  it('should call onNodeTypeSelected with model', () => {
    const onTypeShownChangeLocal = vi.fn();
    const sideBarPropsWithNodeType = {
      ...sideBarProps,
      onTypeShownChange: onTypeShownChangeLocal
    };
    renderSidebar(sideBarPropsWithNodeType);
    fireEvent.click(screen.getByTestId('show-models'));
    expect(onTypeShownChangeLocal).toBeCalledTimes(1);
  });

  it('should call onNodeTypeSelected with skill', () => {
    const onTypeShownChangeLocal = vi.fn();
    const sideBarPropsWithNodeType = {
      ...sideBarProps,
      onTypeShownChange: onTypeShownChangeLocal
    };
    renderSidebar(sideBarPropsWithNodeType);
    fireEvent.click(screen.getByTestId('show-skills'));
    expect(onTypeShownChangeLocal).toBeCalledTimes(1);
  });

  it('should use initial isCollapsed state', () => {
    getItemSpy.mockReturnValueOnce('{"test":true}');
    renderSidebar();
    expect(getItemSpy).toBeCalledWith('waldiez_sidebar');
  });

  it('should handle invalid storage value', () => {
    getItemSpy.mockReturnValueOnce('invalid');
    renderSidebar();
    expect(getItemSpy).toBeCalledWith('waldiez_sidebar');
    expect(getItemSpy).toBeCalledTimes(4);
    expect(localStorage.getItem('waldiez_sidebar')).toBeUndefined();
  });

  it('should store isCollapsed state', () => {
    getItemSpy
      .mockReturnValueOnce(`{"${storageId}":"false"}`)
      .mockReturnValueOnce(`{"${storageId}":"false"}`)
      .mockReturnValueOnce(null) // for lock
      .mockReturnValueOnce(`{"${storageId}":"false"}`);

    renderSidebar();
    fireEvent.click(screen.getByTestId('sidebar-toggle'));
    expect(setItemSpy).toBeCalledTimes(4);
    expect(setItemSpy).toBeCalledWith('waldiez_sidebar', `{"${storageId}":"true"}`);
  });

  it('should store isCollapsed state with invalid storage value', () => {
    getItemSpy
      .mockReturnValueOnce(`{"${storageId}":"true"}`)
      .mockReturnValueOnce(`{"${storageId}":"true"}`)
      .mockReturnValueOnce(null) // for lock
      .mockReturnValueOnce('invalid');

    renderSidebar();
    fireEvent.click(screen.getByTestId('sidebar-toggle'));
    expect(setItemSpy).toBeCalledTimes(4);
    expect(setItemSpy).toBeCalledWith('waldiez_sidebar', `{"${storageId}":"false"}`);
  });

  it('should handle drag start', () => {
    renderSidebar();
    fireEvent.dragStart(screen.getByTestId('user-dnd'), {
      dataTransfer: { setData: vi.fn() }
    });
    fireEvent.dragStart(screen.getByTestId('assistant-dnd'), {
      dataTransfer: { setData: vi.fn() }
    });
    fireEvent.dragStart(screen.getByTestId('manager-dnd'), {
      dataTransfer: { setData: vi.fn() }
    });
  });
});
