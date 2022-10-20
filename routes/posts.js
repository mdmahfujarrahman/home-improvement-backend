import express from "express";
import { addPost, deletePost, getPosts, getSinglePost, updatePost } from "../controller/posts.controller.js";
const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getSinglePost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.patch("/:id", updatePost);

export default router;
