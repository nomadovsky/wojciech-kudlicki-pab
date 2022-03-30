import fs from "fs";
import { Note } from "./models/note";
import { Tag } from "./models/tag";

export async function readNotesFromFile(file: string): Promise<Note[]> {
  try {
    const data = await fs.promises.readFile(file, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
}

export async function readTagsFromFile(file: string): Promise<Tag[]> {
  try {
    const data = await fs.promises.readFile(file, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
}
export async function updateNotesFromFile(
  storeFile: string,
  dataToSave: Note[]
): Promise<void> {
  try {
    await fs.promises.writeFile(storeFile, JSON.stringify(dataToSave));
  } catch (err) {
    throw err;
  }
}
export async function updateTagsFromFile(
  storeFile: string,
  dataToSave: Tag[]
): Promise<void> {
  try {
    await fs.promises.writeFile(storeFile, JSON.stringify(dataToSave));
  } catch (err) {
    throw err;
  }
}
