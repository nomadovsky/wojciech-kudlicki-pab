import { Note } from "./models/note";

import fs from "fs";
import { Tag } from "./models/tag";

export async function readStorage(file: string): Promise<void> {
  try {
    const data = await fs.promises.readFile(file, "utf-8");
  } catch (err) {
    console.log(err);
  }
}

export async function updateStorage(
  storeFile: string,
  dataToSave: Note | Tag[] | undefined
): Promise<void> {
  try {
    await fs.promises.writeFile(storeFile, JSON.stringify(dataToSave));
  } catch (err) {
    console.log(err);
  }
}
