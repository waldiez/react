import packageJson from "../package.json";
import fs from "fs";
import path from "path";
import tsj from "ts-json-schema-generator";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const repositoryUrl = packageJson.repository.url.replace(".git", "");
const schemaId = `${repositoryUrl}/tree/v${packageJson.version}/schema.json`;
const config = {
    tsconfig: "tsconfig.docs.json",
    type: "WaldiezFlow",
    expose: "export" as "all" | "none" | "export",
    jsDoc: "extended" as "none" | "extended" | "basic",
    schemaId,
    skipTypeCheck: false,
    topRef: false,
};

const schema = tsj.createGenerator(config).createSchema(config.type);
const schemaString = JSON.stringify(schema, null, 2);
const outputPath = path.resolve(__dirname, "..", "schema.json");
fs.writeFile(outputPath, schemaString, err => {
    if (err) {
        throw err;
    }
    console.info(`Schema written to ${outputPath}`);
});
