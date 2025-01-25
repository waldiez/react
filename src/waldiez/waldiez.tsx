/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HotkeysProvider } from "react-hotkeys-hook";

import "rc-slider/assets/index.css";

import { loader } from "@monaco-editor/react";

import { WaldiezFlowView } from "@waldiez/containers/flow";
import { SidebarProvider } from "@waldiez/containers/sidebar";
import { WaldiezProvider } from "@waldiez/store";
import "@waldiez/styles/index.css";
import { WaldiezThemeProvider, isInitiallyDark, setIsDarkMode } from "@waldiez/theme";
import { WaldiezProps } from "@waldiez/types";
import { getId } from "@waldiez/utils";

export const Waldiez = (props: Partial<WaldiezProps>) => {
    const flowId: string = props.flowId ?? `wf-${getId()}`;
    const nodes = props.nodes ?? [];
    const edges = props.edges ?? [];
    const { inputPrompt, monacoVsPath, onUserInput } = props;
    useEffect(() => {
        checkInitialBodyThemeClass();
        checkInitialBodySidebarClass();
        // make sure no leftover lock
        window.localStorage.removeItem(`snackbar-${flowId}.lock`);
    }, []);
    useEffect(() => {
        if (monacoVsPath) {
            loader.config({ paths: { vs: monacoVsPath } });
        }
    }, [monacoVsPath]);
    return (
        <WaldiezThemeProvider>
            <ErrorBoundary fallbackRender={fallbackRender}>
                <HotkeysProvider initiallyActiveScopes={[flowId]}>
                    <ReactFlowProvider>
                        <SidebarProvider>
                            <WaldiezProvider {...props} flowId={flowId} nodes={nodes} edges={edges}>
                                <WaldiezFlowView
                                    flowId={flowId}
                                    inputPrompt={inputPrompt}
                                    onUserInput={onUserInput}
                                />
                            </WaldiezProvider>
                        </SidebarProvider>
                    </ReactFlowProvider>
                </HotkeysProvider>
            </ErrorBoundary>
        </WaldiezThemeProvider>
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

const checkInitialBodyThemeClass = () => {
    const isDark = isInitiallyDark();
    setIsDarkMode(isDark);
};

const checkInitialBodySidebarClass = () => {
    // if the initial body class is not set,
    // set it based on the user's preference
    if (
        !document.body.classList.contains("waldiez-sidebar-collapsed") &&
        !document.body.classList.contains("waldiez-sidebar-expanded")
    ) {
        const sidebarQuery = window.matchMedia("(prefers-sidebar: collapsed)");
        if (sidebarQuery.matches) {
            document.body.classList.add("waldiez-sidebar-collapsed");
        } else {
            document.body.classList.add("waldiez-sidebar-expanded");
        }
    }
};
