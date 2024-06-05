import express from "express";
import userRouter from "./routes/user.router.js";
import authRouter from "./routes/auth.router.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import postRouter from "./routes/post.route.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(err.statusCode || 500).send({
    message: err.message,
    statusCode: err.statusCode || 500,
  });
});

app.listen(3000, () => {
  console.log("server is successfully connected");
});
