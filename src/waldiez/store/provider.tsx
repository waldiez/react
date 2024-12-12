import React, { useMemo, useRef } from 'react';

import { WaldiezContext, WaldiezStore, createWaldiezStore } from '@waldiez/store';
import { WaldiezStoreProps } from '@waldiez/types';

export type WaldiezProviderProps = React.PropsWithChildren<WaldiezStoreProps>;

/**
 * React Context Provider for Waldiez Store
 * @param children - ReactNode
 * @param props - WaldiezProviderProps
 * @returns React.JSX.Element
 */
export function WaldiezProvider({
  children,
  ...props
}: WaldiezProviderProps & {
  storageId: string;
  createdAt: string;
  updatedAt: string;
}): React.JSX.Element {
  const storeRef = useRef<WaldiezStore | undefined>(undefined);
  const nodes = props.nodes;
  const edges = props.edges;
  const flowId = props.flowId;
  const name = props.name;
  const description = props.description;
  const tags = props.tags;
  const requirements = props.requirements;
  const createdAt = props.createdAt;
  const updatedAt = props.updatedAt;
  const storageId = props.storageId;
  const onUpload = props.onUpload ?? null;
  const onChange = props.onChange ?? null;
  const onSave = props.onSave ?? null;
  const rfInstance = props.rfInstance;
  const store = useMemo(() => {
    storeRef.current = createWaldiezStore({
      flowId,
      name,
      description,
      tags,
      requirements,
      storageId,
      createdAt,
      updatedAt,
      nodes,
      edges,
      rfInstance,
      onUpload,
      onChange,
      onSave
    });
    return storeRef.current;
  }, [flowId]);
  return <WaldiezContext.Provider value={store}>{children}</WaldiezContext.Provider>;
}
