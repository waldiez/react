import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, vi } from "vitest";

import React from "react";

const mockMatchMedia = () => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(), // deprecated
            removeListener: vi.fn(), // deprecated
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
};
export class ResizeObserver {
    callback: globalThis.ResizeObserverCallback;

    constructor(callback: globalThis.ResizeObserverCallback) {
        this.callback = callback;
    }

    observe(target: Element) {
        this.callback([{ target } as globalThis.ResizeObserverEntry], this);
    }

    unobserve() {}

    disconnect() {}
}

export class DOMMatrixReadOnly {
    m22: number;
    constructor(transform: string) {
        const scale = transform?.match(/scale\(([1-9.])\)/)?.[1];
        this.m22 = scale !== undefined ? +scale : 1;
    }
}
// Only run the shim once when requested
let init = false;

export const mockReactFlow = () => {
    if (init) {
        return;
    }
    init = true;

    global.ResizeObserver = ResizeObserver;

    /* eslint-disable @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    global.DOMMatrixReadOnly = DOMMatrixReadOnly;

    Object.defineProperties(global.HTMLElement.prototype, {
        offsetHeight: {
            get() {
                return parseFloat(this.style.height) || 1;
            },
        },
        offsetWidth: {
            get() {
                return parseFloat(this.style.width) || 1;
            },
        },
    });

    (global.SVGElement as any).prototype.getBBox = () => ({
        x: 10,
        y: 10,
        width: 30,
        height: 30,
    });
};
vi.setConfig({ testTimeout: 30_000 });
vi.mock("zustand"); // __mocks__/zustand.ts
vi.mock("@monaco-editor/react", async () => {
    return {
        __esModule: true,
        ...(await vi.importActual("@monaco-editor/react")),
        default: props => {
            return (
                <textarea
                    placeholder="mocked-monaco-editor"
                    data-testid={props["data-testid"] ?? "mocked-monaco-editor"}
                    value={props.value}
                    onChange={event => props.onChange(event.target.value)}
                    className={props.className ?? ""}
                ></textarea>
            );
        },
        Editor: props => {
            return (
                <textarea
                    placeholder="mocked-monaco-editor"
                    data-testid={props["data-testid"] ?? "mocked-monaco-editor"}
                    value={props.value}
                    onChange={event => props.onChange(event.target.value)}
                    className={props.className ?? ""}
                ></textarea>
            );
        },
        loader: {
            init: vi.fn(),
            config: vi.fn(),
            defineTheme: vi.fn(),
            defineMonarchLanguage: vi.fn(),
            defineThemeLoaders: vi.fn(),
            defineWorker: vi.fn(),
            getOrCreateMode: vi.fn(),
            getOrCreateModeByLanguage: vi.fn(),
            getOrCreateWorker: vi.fn(),
            getWorker: vi.fn(),
            getWorkerUrl: vi.fn(),
            setModelMarkers: vi.fn(),
            setModelMarkersWorker: vi.fn(),
            setModelMarkersWorkerUrl: vi.fn(),
            setModelMarkersUrl: vi.fn(),
        },
    };
});
beforeEach(() => {
    mockReactFlow();
    mockMatchMedia();
    vi.useFakeTimers({ shouldAdvanceTime: true });
});
afterEach(() => {
    cleanup();
    vi.useRealTimers();
});
beforeAll(() => {
    global.ResizeObserver = ResizeObserver;
    HTMLDialogElement.prototype.show = vi.fn();
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
    HTMLDivElement.prototype.scrollIntoView = vi.fn();
    HTMLAnchorElement.prototype.click = vi.fn();
    HTMLElement.prototype.getBoundingClientRect = () =>
        ({
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            top: 0,
            right: 100,
            bottom: 100,
            left: 0,
        }) as DOMRect;
    window.URL.createObjectURL = vi.fn();
    window.URL.revokeObjectURL = vi.fn();
    document.elementFromPoint = (): null => null;
});
afterAll(() => {
    vi.resetAllMocks();
});
