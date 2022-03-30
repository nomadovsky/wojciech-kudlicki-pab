import { Router, Request, Response } from "express";
import {
  createNote,
  deleteNote,
  getNote,
  updateNote,
} from "../controllers/notes";

const router = Router();

router.post("/", createNote);

router.route("/:id").get(getNote).put(updateNote).delete(deleteNote);

export default router;
