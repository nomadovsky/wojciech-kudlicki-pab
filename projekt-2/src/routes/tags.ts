import { Router } from "express";

const router = Router();

router.get("/", function (req, res) {
  res.send("Tags page");
});

export default router;
