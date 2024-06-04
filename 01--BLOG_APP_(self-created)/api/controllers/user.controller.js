import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";

export const test = async (req, res, next) => {
  console.log("successfully done");
  const user = await User.findById({ _id: "665c125bd9addc9e76dcf535" });
  console.log(user);
};

export const updateUser = async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  const User2 = await User.findOne({ email: req.user.email });

  if (user._id.toString() !== User2._id.toString()) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          bio: req.body.bio,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    return next(error);
  }
};
