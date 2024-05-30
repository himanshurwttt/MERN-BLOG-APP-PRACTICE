import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    password === "" ||
    email === ""
  ) {
    return next(errorHandler(400, "all fields are required"));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    next(errorHandler(402, "User already exist , please login"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    password: hashedPassword,
    email,
  });

  try {
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_TOKEN_KEY, {
      expiresIn: "5d",
    });
    res.status(200).cookie("access_token", token).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password || password === "" || email === "") {
      return next(errorHandler(400, "all fields are required"));
    }

    const verifyUser = await User.findOne({ email });
    const verifyPassword = bcryptjs.compareSync(password, verifyUser.password);
    const token = jwt.sign({ id: verifyUser.id }, process.env.JWT_TOKEN_KEY);

    if (!verifyPassword) {
      return next(errorHandler(400, "user not found & Check you password"));
    }

    const { password: pass, ...rest } = verifyUser._doc;

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "signout successfully" });
  } catch (error) {
    next(error);
  }
};
