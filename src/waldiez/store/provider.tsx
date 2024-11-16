import { useRef } from 'react';

import { WaldiezContext, WaldiezStore, createWaldiezStore } from '@waldiez/store';
import { WaldiezStoreProps } from '@waldiez/types';

export type WaldiezProviderProps = React.PropsWithChildren<WaldiezStoreProps>;

/**
 * React Context Provider for Waldiez Store
 * @param children - ReactNode
 * @param props - WaldiezProviderProps
 * @returns JSX.Element
 */
export function WaldiezProvider({
  children,
  ...props
}: WaldiezProviderProps & {
  storageId: string;
  createdAt: string;
  updatedAt: string;
}): JSX.Element {
  const storeRef = useRef<WaldiezStore>();
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
  const rfInstance = props.rfInstance;
  if (!storeRef.current) {
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
      onChange
    });
  }
  return <WaldiezContext.Provider value={storeRef.current}>{children}</WaldiezContext.Provider>;
}
