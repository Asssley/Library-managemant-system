import { readFile } from "fs/promises"
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getPath = function (pathToFile: string | string[]): string {
  if (Array.isArray(pathToFile)) {
    return path.join(__dirname, "../", ...pathToFile);
  }
  return path.join(__dirname, "../", pathToFile);
}

export const getSQL = async function (path: string): Promise<string> {
  return await readFile(getPath(["../sql", path]), "utf8");
}