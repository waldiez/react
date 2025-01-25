/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { downloadFile, exportItem } from "@waldiez/utils";

describe("exportItem", () => {
    it("should export an item", () => {
        vi.spyOn(URL, "createObjectURL");
        const exporter = () => ({ id: "1" });
        exportItem("test", "model", exporter);
        waitFor(() => expect(URL.createObjectURL).toHaveBeenCalled());
    });
    it("should not export an item", () => {
        vi.spyOn(URL, "createObjectURL");
        const exporter = () => null;
        exportItem("test", "model", exporter);
        waitFor(() => expect(URL.createObjectURL).not.toHaveBeenCalled());
    });
});

describe("downloadFile", () => {
    it("should download a file", () => {
        vi.spyOn(URL, "revokeObjectURL");
        const blob = new Blob(["{}"], { type: "application/json" });
        downloadFile(blob, "test.json");
        waitFor(() => expect(URL.revokeObjectURL).toHaveBeenCalled());
    });
});
