import { useRef } from 'react';

import { WaldieContext, WaldieStore, createWaldieStore } from '@waldiez/store';
import { WaldieStoreProps } from '@waldiez/types';

export type WaldieProviderProps = React.PropsWithChildren<WaldieStoreProps>;

/**
 * React Context Provider for Waldie Store
 * @param children - ReactNode
 * @param props - WaldieProviderProps
 * @returns JSX.Element
 */
export function WaldieProvider({
  children,
  ...props
}: WaldieProviderProps & {
  storageId: string;
  createdAt: string;
  updatedAt: string;
}): JSX.Element {
  const storeRef = useRef<WaldieStore>();
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
  if (!storeRef.current) {
    storeRef.current = createWaldieStore({
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
      onUpload
    });
  }
  return <WaldieContext.Provider value={storeRef.current}>{children}</WaldieContext.Provider>;
}
