import { afterAll, afterEach, beforeEach, vi } from 'vitest';

import { showSnackbar } from '@waldiez/components/snackbar';

describe('Snackbar', () => {
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
  const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');

  afterAll(() => {
    vi.resetAllMocks();
  });
  beforeEach(() => {
    getItemSpy.mockClear();
    setItemSpy.mockClear();
    removeItemSpy.mockClear();
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });
  afterEach(() => {
    getItemSpy.mockClear();
    setItemSpy.mockClear();
    removeItemSpy.mockClear();
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should show snackbar', () => {
    const flowId = 'testFlowId';
    const message = 'testMessage';
    showSnackbar(flowId, message);
    expect(window.localStorage.getItem(`snackbar-${flowId}.lock`)).toBeTruthy();
  });

  it('should hide snackbar after 3 seconds', () => {
    const flowId = 'testFlowId';
    const message = 'testMessage';
    showSnackbar(flowId, message, 'info', 2000);
    vi.advanceTimersByTime(3000);
    expect(window.localStorage.getItem(`snackbar-${flowId}.lock`)).toBeNull();
  });

  it('should handle calling twice', () => {
    const flowId = 'testFlowId';
    const message = 'testMessage';
    showSnackbar(flowId, message);
    expect(window.localStorage.getItem(`snackbar-${flowId}.lock`)).toBeTruthy();
    // cover 7-11 (already called showSnackbar)
    showSnackbar(flowId, message);
  });
});
