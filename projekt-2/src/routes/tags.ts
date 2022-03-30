import { Router } from "express";
import { getAllTags } from "../controllers/tags";

const router = Router();

router.get("/", getAllTags);

export default router;
