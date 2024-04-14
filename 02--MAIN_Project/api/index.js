import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log(`we are connected to the MONGODB database`);
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(3000, () => {
  console.log(`the server site is started successfully`);
});
