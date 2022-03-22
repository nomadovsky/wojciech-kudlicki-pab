import express from "express";
import { Request, Response } from "express";
import { Note, createNote, updateNote } from "./note";

// Notes
let notes: Note[] = [];

// Routing
const app = express();

app.use(express.json());

app.post("/note", function (req: Request, res: Response) {
  const note = createNote(req.body);
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
  const index = +req.params.id;
  const noteIndex: number = notes.findIndex((n) => n.id === index);
  if (noteIndex !== -1) {
    notes[noteIndex] = updateNote(req.body, index);
    res.sendStatus(201);
  } else res.sendStatus(404);
});

app.delete("/note/:id", function (req: Request, res: Response) {
  const note = notes.find((n: Note) => n.id === +req.params.id);
  if (note) {
    notes = notes.filter((n: Note) => n.id !== +req.params.id);
    res.sendStatus(204);
  } else res.sendStatus(400);
});
app.listen(3000);
