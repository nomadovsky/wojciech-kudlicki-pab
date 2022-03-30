import fs from "fs";
import { Note } from "./models/note";
import { Tag } from "./models/tag";
import { User } from "./models/user";

export async function readFromFile<DataType extends Note | Tag>(
  file: string
): Promise<DataType[]> {
  try {
    const data = await fs.promises.readFile(file, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
}

export async function updateFile<DataType extends Note | Tag>(
  storeFile: string,
  dataToSave: DataType[]
): Promise<void> {
  try {
    await fs.promises.writeFile(storeFile, JSON.stringify(dataToSave));
  } catch (err) {
    throw err;
  }
}

export async function readUsersFromFile(file: string): Promise<User[]> {
  try {
    const data = await fs.promises.readFile(file, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
}

export async function saveUsersToken(
  storeFile: string,
  dataToSave: string
): Promise<void> {
  try {
    await fs.promises.writeFile(storeFile, JSON.stringify(dataToSave));
  } catch (err) {
    throw err;
  }
}
