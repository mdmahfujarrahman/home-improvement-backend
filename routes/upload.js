import express from "express";
import { uploadImage } from "../controller/fileUpload.controller.js";
import { uploadMedia } from "../util/multer.config.js";
const router = express.Router();

router.post("/image", uploadMedia.single("file"), uploadImage);

export default router;
