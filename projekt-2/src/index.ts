import express from "express";
import tagRoutes from "./routes/tag";
import tagsRoutes from "./routes/tags";
import noteRoutes from "./routes/note";
import notesRoutes from "./routes/notes";
import loginRoutes from "./routes/login";

const app = express();
app.use(express.json());

app.use("/tag", tagRoutes);
app.use("/tags", tagsRoutes);
app.use("/note", noteRoutes);
app.use("/notes", notesRoutes);
app.use("/login", loginRoutes);

app.listen(3000);
