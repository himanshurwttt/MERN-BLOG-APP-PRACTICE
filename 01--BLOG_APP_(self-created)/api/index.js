import express from "express";
import userRouter from "./routes/user.router.js";
const app = express();

app.use("/api/user", userRouter);

app.listen(3000, () => {
  console.log("server is successfully connected");
});
