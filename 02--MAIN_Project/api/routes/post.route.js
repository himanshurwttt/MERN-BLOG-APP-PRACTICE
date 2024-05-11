import express from "express";
import {
  createPost,
  deletepost,
  getPosts,
} from "../controllers/post.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, createPost);
router.get("/getposts", getPosts);
router.delete("/deletepost/:postId/:userId", verifyUser, deletepost);

export default router;
