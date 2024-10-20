import { createContext, useContext } from 'react';

import { shallow } from 'zustand/shallow';
import { useStoreWithEqualityFn } from 'zustand/traditional';

import { createWaldieStore } from '@waldiez/store/creator';
import { WaldieState } from '@waldiez/store/types';

export type * from '@waldiez/store/types';
export { createWaldieStore };
export { importFlow, importModel, importAgent, importSkill } from '@waldiez/store/importing';
export { exportModel, exportAgent, exportFlow, exportSkill } from '@waldiez/store/exporting';

export { WaldieProvider } from '@waldiez/store/provider';

export type WaldieStore = ReturnType<typeof createWaldieStore>;
export const WaldieContext = createContext<WaldieStore | null>(null);
export function useWaldieContext<T>(selector: (state: WaldieState) => T): T {
  const store = useContext(WaldieContext);
  if (!store) {
    throw new Error('Missing WaldieContext.Provider in the tree');
  }
  return useStoreWithEqualityFn(store, selector, shallow);
}
