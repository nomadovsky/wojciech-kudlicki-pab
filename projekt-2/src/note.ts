import { Tag } from "./tag";

export interface Note {
  title: string;
  content: string;
  createDate?: string;
  tags?: Tag[];
  id?: number;
}

export function createNote(note: Note) {
  const date = new Date(Date.now());
  const newNote: Note = {
    title: note.title,
    content: note.content,
    createDate: date.toISOString(),
    tags: note.tags,
    id: Date.now(),
  };
  return newNote;
}
export function updateNote(note: Note, noteId: number) {
  const date = new Date(Date.now());
  const newNote: Note = {
    title: note.title,
    content: note.content,
    createDate: date.toISOString(),
    tags: note.tags,
    id: noteId,
  };
  return newNote;
}
