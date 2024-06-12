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
  const User3 = await User.findOne({ _id: req.user.id });

  if (req.user.id) {
    if (user._id.toString() !== User3._id.toString()) {
      return next(errorHandler(403, "You are not allowed to update this user"));
    }
  } else if (req.user.email) {
    if (user._id.toString() !== User2._id.toString()) {
      return next(errorHandler(403, "You are not allowed to update this user"));
    }
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

// export const getUsers = async (req, res, next) => {
//   try {
//     if (!req.user.isAdmin) {
//       return next(errorHandler(401, "Admin required to fetch all users"));
//     } else {
//       const allUsers = await User.find();
//       const noOfUsers = await User.countDocuments();

//       const { password, ...rest } = allUsers._doc;
//       res.status(200).json({ rest, noOfUsers });
//     }
//   } catch (error) {
//     return next(error);
//   }
// };
