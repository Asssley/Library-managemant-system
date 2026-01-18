import {readFile} from "fs/promises"
import path from "path";

export const getPath = function (pathToFile: string): string {
  return path.join(__dirname, "../views/admin-main.ejs");
}

export const getSQL = async function (path: string): Promise<string> {
  return await readFile(getPath(path), "utf8");
}