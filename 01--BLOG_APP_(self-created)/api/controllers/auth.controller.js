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
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
      })
      .json(newUser);
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
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Try to find an existing user
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      // User exists, prepare the response
      const { password, ...rest } = existedUser._doc;
      const token = jwt.sign({ email }, process.env.JWT_TOKEN_KEY, {
        expiresIn: "2d",
      });
      await res.status(200).cookie("access_token", token).json(rest); // Send user data directly
    } else {
      // No user found, create a new user
      const generateRandomUsername = (email) => {
        const prefix = email.split("@")[0];
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        return `${prefix}${randomSuffix}`;
      };

      // Function to generate a random password
      const generateRandomPassword = () => {
        const chars =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+[]{}|;:,.<>?";
        let password = "";
        for (let i = 0; i < 12; i++) {
          const randomIndex = Math.floor(Math.random() * chars.length);
          password += chars[randomIndex];
        }
        return password;
      };

      const username = generateRandomUsername(email);
      const randpassword = generateRandomPassword();
      const hashedPassword = await bcryptjs.hash(randpassword, 10);
      const newUser = new User({
        email,
        username: username,
        password: hashedPassword,
        profilePicture:
          "https://imgs.search.brave.com/bIkpHw6cWZRHzdOnYK7TnI67_uqVzpREf0V0pQWu_pw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2RkL2Yw/LzExL2RkZjAxMTBh/YTE5ZjQ0NTY4N2I3/Mzc2NzllZWM5Y2Iy/LmpwZw", // Set a default value or handle dynamically
        isAdmin: false,
      });

      // Save the new user to the database
      await newUser.save();

      // Prepare the response for the new user
      const token = jwt.sign({ email }, process.env.JWT_TOKEN_KEY, {
        expiresIn: "2d",
      });
      const { password, ...rest } = newUser._doc;

      await res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          sameSite: "strict",
          path: "/",
        })
        .json(rest); // Send user data directly
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};

export const signout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token", {
        sameSite: "strict",
        httpOnly: true,
        path: "/",
      })
      .status(200)
      .json({ message: "signout successfully" });
  } catch (error) {
    next(error);
  }
};
