import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { createPost, getPost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/createpost/:userId", verifyToken, createPost);
<<<<<<< HEAD
router.get("/getpost", getPost);
=======
router.get("/getpost ", getPost);
>>>>>>> origin/main

export default router;
