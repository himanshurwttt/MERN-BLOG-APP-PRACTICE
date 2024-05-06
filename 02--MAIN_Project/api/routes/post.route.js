import express from "express";
import { createPost } from "../controllers/post.controller";
import { verifyUser } from "../utils/verifyUser";

const router = express.Router();

router.post("/create", verifyUser, createPost);

export default router;
