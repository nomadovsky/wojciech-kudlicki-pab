import { RequestHandler } from "express";
import { readFromFile, updateFile, readUsersFromFile } from "../fileOperations";
import { Note } from "../models/note";
import { addTag } from "../controllers/tags";
import { authenticateToken } from "../controllers/auth";

const NOTES_PATH = "data/notes.json";

export const getNote: RequestHandler = async (req, res, next) => {
  const notes = await readFromFile<Note>(NOTES_PATH);
  const note = notes.find((n) => n.id === +req.params.id);
  const currentUser = authenticateToken(req, res);
  if (note && currentUser !== note.author && currentUser !== "Admin")
    throw Error("You don't have an access to get this note");
  const noteJSON = JSON.stringify(note);
  if (note) res.status(200).send(`200 ${noteJSON}`);
  else res.sendStatus(404);
};

export const getAllNotes: RequestHandler = async (req, res, next) => {
  const notes = await readFromFile<Note>(NOTES_PATH);
  const currentUser = authenticateToken(req, res);
  res.status(200)
    ? currentUser === "Admin"
      ? res.send(notes)
      : res.send(notes.filter((user) => user.author === currentUser))
    : res.sendStatus(400);
};

const createdNote = (note: Note, noteAuthor: string, noteId?: number) => {
  const date = new Date(Date.now());
  const newNote: Note = {
    title: note.title,
    author: noteAuthor,
    content: note.content,
    createDate: date.toISOString(),
    tags: note.tags,
    id: noteId ?? Date.now(),
  };
  return newNote;
};

export const createNote: RequestHandler = async (req, res, next) => {
  const notes = await readFromFile<Note>(NOTES_PATH);
  // const users = await readUsersFromFile(USERS_PATH);
  const currentUser = authenticateToken(req, res);
  const note = req.body;
  if (!currentUser || !note) throw Error("You can't create a note");
  const newNote = createdNote(note, currentUser);
  if (res.status(201)) {
    res.send(`201 Note ID: ${newNote.id}`);
    await updateFile<Note>(NOTES_PATH, [...notes, newNote]);
    if (newNote.tags) {
      newNote.tags.forEach((tag) => addTag(tag));
    }
  } else res.sendStatus(400);
};

export const updateNote: RequestHandler = async (req, res, next) => {
  try {
    const notes = await readFromFile(NOTES_PATH);
    const currentUser = authenticateToken(req, res);
    if (!currentUser) throw new Error("Please log in");

    const index = +req.params.id;
    const noteIndex: number = notes.findIndex((n) => n.id === index);
    if (noteIndex !== -1) {
      const foundNote = notes.find((note) => note.id === index) as Note;
      const author = foundNote.author;
      const newNote = createdNote(req.body, author, index);
      if (newNote.author !== currentUser && currentUser !== "Admin")
        throw new Error("You're not authorized to update this note");
      notes[noteIndex] = newNote;
      if (newNote.tags) {
        newNote.tags.forEach((tag) => {
          addTag(tag);
        });
      }
      res.sendStatus(201);
    }
  } catch (err) {
    let message;
    err instanceof Error ? (message = err.message) : (message = String(err));
    res.send({ message: `${message}` });
  }

  // res.sendStatus(404);
};

export const deleteNote: RequestHandler = async (req, res) => {
  const notes = await readFromFile<Note>(NOTES_PATH);
  const note = notes.find((n: Note) => n.id === +req.params.id);
  const currentUser = authenticateToken(req, res);
  if (!currentUser) throw new Error("Please log in to delete this note");
  if (note) {
    if (note.author !== currentUser && currentUser !== "Admin")
      throw new Error("You're not authorized to delete this note ");
    const newNotes = notes.filter((n: Note) => n.id !== +req.params.id);
    updateFile<Note>(NOTES_PATH, newNotes);
    res.sendStatus(204);
  } else res.sendStatus(400);
};
