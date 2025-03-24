import express from "express";
import cors from "cors";
import {PrismaClient} from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
app.use (express.json());
app.use(cors());

app.get("/api/notes", async(req,res) => {

    const notes= await prisma.note.findMany();

    res.json(notes);
})

app.post("/api/notes", async(req,res) => {
    const {title, content} = req.body;
    const note = await prisma.note.create({
        data:{ title,content}
    })
        res.json(note);
})

app.put("/api/notes/:id", async(req,res) => {
    const {title,content} = req.body;
    const id = parseInt(req.params.id);
   
try {
    const updatedNote =
    await prisma.note.update({
        where: {id},
        data: {title,content}
    })
    res.json(updatedNote);
}
catch (error) {
    res.status(500).send("Oops something went wrong");
    }
});

app.delete("/api/notes/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      await prisma.note.delete({
        where: { id },
      });
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting note");
    }
  });

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})