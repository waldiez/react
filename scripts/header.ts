/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import fs from "fs-extra";
import { glob } from "glob";
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const spdxIdentifier = "Apache-2.0";
const owner = "Waldiez & contributors";
const startYear = 2024;
const currentYear = new Date().getFullYear();
const HEADER = `/**
 * SPDX-License-Identifier: ${spdxIdentifier}
 * Copyright ${startYear} - ${currentYear} ${owner}
 */
`;

const files = glob.sync("./**/*.{ts,tsx}", { nodir: true, ignore: ["node_modules/**"], cwd: rootDir });

files.forEach(file => {
    const content = fs.readFileSync(file, "utf8");

    // Check if the file already contains the header
    if (!content.startsWith(HEADER)) {
        fs.writeFileSync(file, HEADER + content);
        console.log(`Header added to ${file}`);
    }
});
