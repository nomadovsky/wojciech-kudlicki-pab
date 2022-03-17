import express from "express";
import { Request, Response } from "express";
import { Note } from "./note";

const app = express();

const notes: Note[] = [];

function createNote(title: string, content: string, tags?: string[]): Note {
  const date = new Date(Date.now());
  const createDate = date.toISOString();
  const id = Date.now();
  return new Note(title, content, createDate, tags, id);
}

// Routing
app.use(express.json());

app.get("/", function (req: Request, res: Response) {
  res.status(200).send("Get");
});
app.post("/note", function (req: Request, res: Response) {
  const note = createNote("New Title1", "Content1");
  notes.push(note);
  console.log(notes);
  res.status(200).send(`Posted. Number of notes: ${notes.length}`);
});

app.listen(3000);
