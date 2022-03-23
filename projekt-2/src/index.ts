import express from "express";
import { Request, Response } from "express";
import { Note, createNote, updateNote } from "./note";
import { readStorage, updateStorage } from "./fileOperations";
import { Tag } from "./tag";

// Notes
let notes: Note[] = [];

// Tags
let tags: Tag[] = [];
// Routing
const app = express();

app.use(express.json());

app.get("/notes", function (req: Request, res: Response) {
  res.status(200) ? res.send(notes) : res.sendStatus(400);
});

app.post("/note", function (req: Request, res: Response) {
  const note = createNote(req.body);
  notes.push(note);
  if (res.status(201)) {
    res.send(`201 Note ID: ${note.id}`);
    updateStorage("./data/tags.json", note);
  } else res.sendStatus(400);
});

app
  .route("/note/:id")
  .get((req: Request, res: Response) => {
    //Zwraca kod 200 i JSON z notatką lub 404 jeśli notatka nie istnieje
    const note = notes.find((n) => n.id === +req.params.id);
    const noteJSON = JSON.stringify(note);

    if (note) res.status(200).send(`200 ${noteJSON}`);
    else res.sendStatus(404);
  })
  .put((req: Request, res: Response) => {
    const index = +req.params.id;
    const noteIndex: number = notes.findIndex((n) => n.id === index);
    if (noteIndex !== -1) {
      notes[noteIndex] = updateNote(req.body, index);
      res.sendStatus(201);
    } else res.sendStatus(404);
  })
  .delete((req: Request, res: Response) => {
    const note = notes.find((n: Note) => n.id === +req.params.id);
    if (note) {
      notes = notes.filter((n: Note) => n.id !== +req.params.id);
      res.sendStatus(204);
    } else res.sendStatus(400);
  });

app.listen(3000);
