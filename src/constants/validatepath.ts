import { existsSync } from "fs";

export const checkIfFileOrDirectoryExists = (path: string): boolean => {
  const path_des = existsSync(path);
  return path_des;
};
