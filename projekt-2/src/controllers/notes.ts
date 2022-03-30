import { RequestHandler } from "express";
import { readNotesFromFile, updateNotesFromFile } from "../fileOperations";
import { Note } from "../models/note";
import { addTag } from "../controllers/tags";
import { createTags } from "./tags";

const NOTES_PATH = "data/notes.json";

export const getNote: RequestHandler = async (req, res, next) => {
  const notes = await readNotesFromFile(NOTES_PATH);
  const note = notes.find((n) => n.id === +req.params.id);
  const noteJSON = JSON.stringify(note);
  if (note) res.status(200).send(`200 ${noteJSON}`);
  else res.sendStatus(404);
};

export const getAllNotes: RequestHandler = async (req, res, next) => {
  const notes = await readNotesFromFile(NOTES_PATH);
  res.status(200) ? res.send(notes) : res.sendStatus(400);
};

export const createNote: RequestHandler = async (req, res, next) => {
  const notes = await readNotesFromFile(NOTES_PATH);

  const date = new Date(Date.now());
  const note = req.body;
  const newNote: Note = {
    title: note.title,
    content: note.content,
    createDate: date.toISOString(),
    tags: note.tags,
    id: Date.now(),
  };
  if (res.status(201)) {
    res.send(`201 Note ID: ${newNote.id}`);
    await updateNotesFromFile(NOTES_PATH, [...notes, newNote]);
    if (newNote.tags) {
      newNote.tags.forEach((tag) => addTag(tag));
    }
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

export const updateNote: RequestHandler = async (req, res) => {
  const notes = await readNotesFromFile(NOTES_PATH);

  const index = +req.params.id;
  const noteIndex: number = notes.findIndex((n) => n.id === index);
  if (noteIndex !== -1) {
    notes[noteIndex] = updatedNote(req.body, index);
    res.sendStatus(201);
  } else res.sendStatus(404);
};

export const deleteNote: RequestHandler = async (req, res) => {
  const notes = await readNotesFromFile(NOTES_PATH);
  const note = notes.find((n: Note) => n.id === +req.params.id);
  if (note) {
    const newNotes = notes.filter((n: Note) => n.id !== +req.params.id);
    updateNotesFromFile("./data/notes.json", newNotes);
    res.sendStatus(204);
  } else res.sendStatus(400);
};
