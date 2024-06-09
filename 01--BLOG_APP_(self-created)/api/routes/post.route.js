import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  createPost,
  getPost,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/createpost/:userId", verifyToken, createPost);

router.get("/getpost", getPost);
router.put("/updatepost/:postId", verifyToken, updatePost); // Ensure no spaces in the path

export default router;
