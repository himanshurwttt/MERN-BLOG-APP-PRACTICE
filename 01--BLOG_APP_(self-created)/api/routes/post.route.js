import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { createPost, getPost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/createpost/:userId", verifyToken, createPost);
router.get("/getpost", getPost);

export default router;
