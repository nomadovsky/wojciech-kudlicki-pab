import { Router, Request, Response } from "express";
import { getAllNotes, getUserNotes } from "../controllers/notes";

const router = Router();

router.get("/", getAllNotes);
router.get("/user/:userName", getUserNotes);
export default router;
