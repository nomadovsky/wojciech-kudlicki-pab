import express from "express";
import { Request, Response } from "express";
import { Note } from "./note";

// Notes
let notes: Note[] = [];

function createNote(title: string, content: string, tags?: string[]): Note {
  const date = new Date(Date.now());
  const createDate = date.toISOString();
  const id = Date.now();
  return new Note(title, content, createDate, tags, id);
}

// Routing
const app = express();

app.use(express.json());

app.post("/note", function (req: Request, res: Response) {
  const note = createNote("New Title1", "Content1");
  notes.push(note);
  if (res.status(201)) res.send(`201 Note ID: ${note.id}`);
  else res.sendStatus(400);
});

app.get("/note/:id", function (req: Request, res: Response) {
  //Zwraca kod 200 i JSON z notatką lub 404 jeśli notatka nie istnieje
  const note = notes.find((n) => n.id === +req.params.id);
  const noteJSON = JSON.stringify(note);

  if (note) res.status(200).send(`200 ${noteJSON}`);
  else res.sendStatus(404);
});
app.get("/notes", function (req: Request, res: Response) {
  res.send(notes);
});

app.put("/note/:id", function (req: Request, res: Response) {
  const note = notes.find((n) => n.id === +req.params.id);
  const noteJSON = JSON.stringify(note);
  if (res.status(200)) res.send(note);
  else res.sendStatus(404);
});

app.delete("/note/:id", function (req: Request, res: Response) {
  const note = notes.find((n: Note) => n.id === +req.params.id);
  if (note) {
    notes = notes.filter((n: Note) => n.id !== +req.params.id);
    res.sendStatus(204);
  } else res.sendStatus(400);
});
app.listen(3000);
