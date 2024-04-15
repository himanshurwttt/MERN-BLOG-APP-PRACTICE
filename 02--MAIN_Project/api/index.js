import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
const app = express();

app.use(express.json());
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
app.use("/api/auth", authRoute);
