import type { TemporalState } from 'zundo';

import { createContext, useContext } from 'react';

import { shallow } from 'zustand/shallow';
import { useStoreWithEqualityFn } from 'zustand/traditional';

import { createWaldiezStore } from '@waldiez/store/creator';
import { WaldiezState } from '@waldiez/store/types';

export type * from '@waldiez/store/types';
export { createWaldiezStore };
export { importFlow, importModel, importAgent, importSkill } from '@waldiez/store/importing';
export { exportModel, exportAgent, exportFlow, exportSkill } from '@waldiez/store/exporting';

export { WaldiezProvider } from '@waldiez/store/provider';

export type WaldiezStore = ReturnType<typeof createWaldiezStore>;
export const WaldiezContext = createContext<WaldiezStore | null>(null);
export function useWaldiezContext<T>(selector: (state: WaldiezState) => T): T {
  const store = useContext(WaldiezContext);
  if (!store) {
    throw new Error('Missing WaldiezContext.Provider in the tree');
  }
  return useStoreWithEqualityFn(store, selector, shallow);
}
export const useTemporalStore = <T>(selector: (state: TemporalState<Partial<WaldiezState>>) => T) => {
  const store = useContext(WaldiezContext);
  if (!store) {
    throw new Error('Missing WaldiezContext.Provider in the tree');
  }
  return useStoreWithEqualityFn(store.temporal, selector, shallow);
};
