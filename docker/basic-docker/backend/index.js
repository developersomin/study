import express from 'express';
import cors from 'cors';
import {Board} from "./model/board.model.js";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());
app.get('/boards', async (req, res) => {
    const result = await Board.find();
    res.send(result);
});

app.post('/boards', async (req, res) => {
    console.log(req.body);
    const board = new Board({
        writer: req.body.writer,
        title: req.body.title,
        contents: req.body.contents,
    });
    await board.save();

    res.send("게시물 등록");
});

mongoose.connect("mongodb://my-database:27017/mydocker")
    .then(() => console.log("db 접속 성공"))
    .catch(() => console.log("db 접속 실패"));



app.listen(4000);