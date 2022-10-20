import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

const PORT = process.env.PORT || 5000;
const app = express();
dotenv.config();

import authRouter from "./routes/auth.js";
import postRouter from "./routes/posts.js";
import uploadRouter from "./routes/upload.js";
import userRouter from "./routes/users.js";

// middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//router
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);
app.use("/api/files/", uploadRouter);




app.get('/', (req, res) => {
    res.json("Server connected")
})


app.listen(PORT, () => {
    console.log("connected on " + PORT);
})