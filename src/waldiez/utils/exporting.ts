/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
export const BASE_EXTENSION = ".waldiez";

const isMac = () => {
    if ("userAgentData" in navigator) {
        if (typeof navigator.userAgentData === "object") {
            const userAgentData = navigator.userAgentData;
            if (userAgentData && "platform" in userAgentData && typeof userAgentData.platform === "string") {
                return userAgentData.platform.toLowerCase().includes("mac");
            }
        }
    }
    // fallback
    return navigator.userAgent.includes("Macintosh") || navigator.userAgent.includes("Mac OS X");
};

const isSafariOnMac = () => {
    // dummy check for Safari on Mac
    // to avoid possible export issues with the extension (Gatekeeper warning)
    const ua = navigator.userAgent;
    const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
    if (!isSafari) {
        return false;
    }
    return isMac();
};

const getItemExtension = (itemType: "model" | "skill" | "agent" | "flow") => {
    let extension = BASE_EXTENSION;
    if (itemType !== "flow") {
        // .{BASE_EXTENSION}Model, .{BASE_EXTENSION}Skill, .{BASE_EXTENSION}Agent
        extension += itemType.charAt(0).toUpperCase() + itemType.slice(1);
    }
    if (isSafariOnMac()) {
        extension += ".json";
    }
    return extension;
};

export const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
};

export const getFilenameForExporting = (baseName: string, itemType: "model" | "skill" | "agent" | "flow") => {
    const extension = getItemExtension(itemType);
    let filename = baseName || "flow";
    if (filename.length < 3) {
        filename = "flow";
    }
    if (filename.length > 100) {
        filename = filename.slice(0, 100);
    }
    return `${filename}${extension}`;
};

export const exportItem = (
    name: string,
    itemType: "model" | "skill" | "agent" | "flow",
    exporter: () => { [key: string]: unknown } | null,
) => {
    const item = exporter();
    if (item) {
        const itemString = JSON.stringify(item, null, 2);
        const blob = new Blob([itemString], { type: "application/json; charset=utf-8" });
        const filename = getFilenameForExporting(name, itemType);
        downloadFile(blob, filename);
    }
};
