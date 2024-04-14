import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log(`DATABASE connected`);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log(`the server site is started successfully`);
});

app.use("/api/user", userRoute);
