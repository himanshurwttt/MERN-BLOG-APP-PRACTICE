import express from "express";
import {
  createComment,
  getCommentUser,
  getComments,
  test,
} from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/test", test);
router.post("/create/:userId", verifyToken, createComment);
router.get("/getComments/:postId", getComments);
router.get("/getCommentUser/:userId", getCommentUser);

export default router;
