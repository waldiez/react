import { useMemo, useRef } from "react";

import { WaldiezContext } from "@waldiez/store/context";
import { createWaldiezStore } from "@waldiez/store/creator";
import { WaldiezProviderProps, WaldiezStore } from "@waldiez/store/types";

export function WaldiezProvider({ children, ...props }: WaldiezProviderProps) {
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
    const onRun = props.onRun ?? null;
    const onConvert = props.onConvert ?? null;
    const rfInstance = props.rfInstance;
    const isAsync = props.isAsync ?? false;
    const store = useMemo(() => {
        storeRef.current = createWaldiezStore({
            flowId,
            isAsync,
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
            onSave,
            onRun,
            onConvert,
        });
        return storeRef.current;
    }, [flowId]);
    return <WaldiezContext.Provider value={store}>{children}</WaldiezContext.Provider>;
}
