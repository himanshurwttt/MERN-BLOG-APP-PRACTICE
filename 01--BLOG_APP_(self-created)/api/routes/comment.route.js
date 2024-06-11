import express from "express";
import { createComment, test } from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/test", test);
router.post("/create/:userId", verifyToken, createComment);

export default router;
