import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";

export const test = (req, res, next) => {
  console.log("successfully done");
};

export const updateUser = async (req, res, next) => {
  const { username, bio } = req.body;
  const userId = req.params.userId;
  const user = await User.findById(userId);
  console.log("user", user);
  console.log("userId", userId);
  console.log("params", req.params.userId);
  if (!user._id) {
    return next(errorHandler(403, "User Not Match"));
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { $set: { username, bio } },
      { new: true }
    );

    res.status(200).json(updateUser);

    // await new User.save();
  } catch (error) {
    return next(error);
  }
};
