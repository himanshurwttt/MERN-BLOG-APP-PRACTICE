import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: `All fields are empty` });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  res.json({ message: `the signup is successfull` });
};
