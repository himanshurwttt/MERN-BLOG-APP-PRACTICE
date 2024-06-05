import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { createPost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/createpost/:userId", verifyToken, createPost);

export default router;
