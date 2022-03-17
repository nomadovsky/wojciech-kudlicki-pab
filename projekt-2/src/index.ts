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

app.get("/note/:id", function (req: Request, res: Response) {
  //Zwraca kod 200 i JSON z notatką lub 404 jeśli notatka nie istnieje
  const note = notes.find((n) => (n.id = +req.params.id));
  const noteJSON = JSON.stringify(note);
  if (res.status(200)) res.send(`200 ${noteJSON}`);
  else res.sendStatus(404);
});
app.post("/note", function (req: Request, res: Response) {
  const note = createNote("New Title1", "Content1");
  notes.push(note);
  console.log(notes);
  if (res.status(201)) res.send(`201 Note ID: ${note.id}`);
  else res.sendStatus(400);
});

app.listen(3000);
