import { RequestHandler } from "express";
import { readStorage, updateStorage } from "../fileOperations";
import { Note } from "../models/note";
import { Tag } from "../models/tag";

let notes: Note[] = [];

export const getNote: RequestHandler = (req, res, next) => {
  const note = notes.find((n) => n.id === +req.params.id);
  const noteJSON = JSON.stringify(note);
  if (note) res.status(200).send(`200 ${noteJSON}`);
  else res.sendStatus(404);
};

export const getAllNotes: RequestHandler = (req, res, next) => {
  res.status(200) ? res.send(notes) : res.sendStatus(400);
};

export const createNote: RequestHandler = (req, res, next) => {
  const date = new Date(Date.now());
  const note = req.body;
  const newNote: Note = {
    title: note.title,
    content: note.content,
    createDate: date.toISOString(),
    tags: note.tags,
    id: Date.now(),
  };
  notes.push(newNote);
  if (res.status(201)) {
    res.send(`201 Note ID: ${newNote.id}`);
    updateStorage("./data/tags.json", newNote.tags);
  } else res.sendStatus(400);
};

const updatedNote = (note: Note, noteId: number) => {
  const date = new Date(Date.now());
  const newNote: Note = {
    title: note.title,
    content: note.content,
    createDate: date.toISOString(),
    tags: note.tags,
    id: noteId,
  };
  return newNote;
};

export const updateNote: RequestHandler = (req, res) => {
  const index = +req.params.id;
  const noteIndex: number = notes.findIndex((n) => n.id === index);
  if (noteIndex !== -1) {
    notes[noteIndex] = updatedNote(req.body, index);
    res.sendStatus(201);
  } else res.sendStatus(404);
};

export const deleteNote: RequestHandler = (req, res) => {
  const note = notes.find((n: Note) => n.id === +req.params.id);
  if (note) {
    notes = notes.filter((n: Note) => n.id !== +req.params.id);
    res.sendStatus(204);
  } else res.sendStatus(400);
};
