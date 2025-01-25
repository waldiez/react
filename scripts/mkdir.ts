/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
/**
 * simple `mkdir -p` using fsPromises.mkdir
 */
import { promises as fs } from "fs";
import { resolve, sep } from "path";

/**
 * Create a directory
 * @param path - the path to create
 * @param parents - whether to create parent directories
 */
async function mkdir(path: string, parents: boolean): Promise<void> {
    const options = { recursive: parents };
    try {
        await fs.access(resolve(path));
        return;
    } catch (_) {
        // do nothing
    }
    await fs.mkdir(resolve(path), options);
}

const _usage = (isHelp: boolean = false) => {
    const myName = process.argv[1].split(sep).pop();
    const consoleLog = isHelp ? console.info : console.error;
    const exitCode = isHelp ? 0 : 1;
    consoleLog(`Usage: node --import=tsx ${myName} --path <path> [--parents]`);
    process.exit(exitCode);
};

const isValidCall = () => {
    if (
        process.argv.includes("-h") ||
        process.argv.includes("--help") ||
        process.argv.length < 3 ||
        process.argv.length > 5
    ) {
        _usage(true);
    }
};
const parseArgs = () => {
    const args = process.argv.slice(2);
    let path = "";
    let parents = false;
    for (let i = 0; i < args.length; i++) {
        if (args[i] === "--path") {
            path = args[i + 1];
            i++;
        } else if (args[i] === "--parents") {
            parents = true;
        }
    }
    return { path, parents };
};

const _main = () => {
    isValidCall();
    const { path, parents } = parseArgs();
    if (path === "") {
        _usage();
        return;
    }
    mkdir(path, parents)
        .then(() => {
            // no-op
        })
        .catch(err => {
            console.error(err);
            process.exit(1);
        });
};

_main();
