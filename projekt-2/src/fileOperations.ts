import { Note } from "./note";

import fs from "fs";

export async function readStorage(file: string): Promise<void> {
  try {
    const data = await fs.promises.readFile(file, "utf-8");
  } catch (err) {
    console.log(err);
  }
}

export async function updateStorage(
  storeFile: string,
  dataToSave: Note
): Promise<void> {
  try {
    await fs.promises.writeFile(storeFile, JSON.stringify(dataToSave));
  } catch (err) {
    console.log(err);
  }
}
