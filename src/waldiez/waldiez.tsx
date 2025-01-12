import { Edge, Node, ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HotkeysProvider } from "react-hotkeys-hook";

import "rc-slider/assets/index.css";

import { loader } from "@monaco-editor/react";

import { WaldiezFlow } from "@waldiez/components";
import { WaldiezProvider } from "@waldiez/store";
import "@waldiez/styles/index.css";
import { WaldiezProps } from "@waldiez/types";
import { getId } from "@waldiez/utils";

export const Waldiez = (props: Partial<WaldiezProps>) => {
    const { flowId, storageId, createdAt, updatedAt, name, description, tags, requirements, nodes, edges } =
        getInitialProps(props);
    const { viewport, inputPrompt, monacoVsPath, onChange, onRun, onUserInput, onUpload, onConvert, onSave } =
        props;
    useEffect(() => {
        if (monacoVsPath) {
            loader.config({ paths: { vs: monacoVsPath } });
        }
    }, [monacoVsPath]);
    return (
        <ErrorBoundary fallbackRender={fallbackRender}>
            <HotkeysProvider initiallyActiveScopes={[flowId]}>
                <ReactFlowProvider>
                    <WaldiezProvider
                        flowId={flowId}
                        viewport={viewport}
                        name={name}
                        description={description}
                        tags={tags}
                        requirements={requirements}
                        storageId={storageId}
                        createdAt={createdAt}
                        updatedAt={updatedAt}
                        nodes={nodes}
                        edges={edges}
                        onUpload={onUpload}
                        onChange={onChange}
                        onSave={onSave}
                    >
                        <WaldiezFlow
                            flowId={flowId}
                            storageId={storageId}
                            monacoVsPath={monacoVsPath}
                            inputPrompt={inputPrompt}
                            onUpload={onUpload}
                            onChange={onChange}
                            onRun={onRun}
                            onUserInput={onUserInput}
                            onConvert={onConvert}
                            onSave={onSave}
                        />
                    </WaldiezProvider>
                </ReactFlowProvider>
            </HotkeysProvider>
        </ErrorBoundary>
    );
};

type errorRenderProps = {
    error: Error;
    resetErrorBoundary: (...args: any[]) => void;
};
const fallbackRender = (props: errorRenderProps) => {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.
    const { error } = props;
    // const { error, resetErrorBoundary } = props;
    // resetErrorBoundary();
    return (
        <div className="error-boundary" data-testid="error-boundary">
            <p>Something went wrong :(</p>
            <pre className="error">{error.message}</pre>
        </div>
    );
};

const getInitialProps = (props: Partial<WaldiezProps>) => {
    const flowId: string = props.flowId ?? `wf-${getId()}`;
    const storageId: string = props.storageId ?? `wf-storage-${getId()}`;
    const createdAt: string = props.createdAt ?? new Date().toISOString();
    const updatedAt: string = props.updatedAt ?? new Date().toISOString();
    const name: string = props.name ?? "Untitled";
    const description: string = props.description ?? "A Waldiez flow";
    const tags: string[] = props.tags ?? [];
    const requirements: string[] = props.requirements ?? [];
    const nodes: Node[] = props.nodes ?? [];
    const edges: Edge[] = props.edges ?? [];
    return {
        flowId,
        storageId,
        createdAt,
        updatedAt,
        name,
        description,
        tags,
        requirements,
        nodes,
        edges,
    };
};
