import { Router } from "express";
import { createTags, deleteTag, getTag, updateTags } from "../controllers/tags";

const router = Router();

router.post("/", createTags);

router.route("/:id").get(getTag).put(updateTags).delete(deleteTag);

export default router;
