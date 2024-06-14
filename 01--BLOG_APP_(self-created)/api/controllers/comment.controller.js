import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";

export const test = async (req, res, next) => {
  console.log("comment route hit");
  res.status(200).json("comment hit successfully");
};

export const createComment = async (req, res, next) => {
  try {
    const { content, postId } = req.body;
    const user = await User.findById(req.params.userId);
    const User2 = await User.findOne({ email: req.user.email });
    const User3 = await User.findOne({ _id: req.user.id });

    if (req.user.id) {
      if (user._id.toString() !== User3._id.toString()) {
        return next(
          errorHandler(403, "You are not allowed to update this user")
        );
      }
    } else if (req.user.email) {
      if (user._id.toString() !== User2._id.toString()) {
        return next(
          errorHandler(403, "You are not allowed to update this user")
        );
      }
    }
    const newComment = new Comment({
      content,
      postId,
      userId: user._id.toString(),
    });
    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    return next(error);
  }
};

export const getComments = async (req, res, next) => {
  if (!req.params.postId) {
    return next(errorHandler(402, "Can't find comment now"));
  }
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    if (!comments) {
      return next(errorHandler(402, "No comments"));
    }
    res.status(200).json(comments);
  } catch (error) {
    return next(error);
  }
};

export const getCommentUser = async (req, res, next) => {
  const userId = req.params.userId;
  if (!userId) {
    return next(errorHandler(402, "User not Found"));
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(403, "User Not Found"));
    } else {
      res.status(200).json({
        username: user.username,
        profilePicture: user.profilePicture,
        email: user.email,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const commentLike = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const hasLiked = comment.likes.includes(userId);

    if (hasLiked) {
      comment.likes.pull(userId);
      comment.noOfLikes -= 1;
    } else {
      comment.likes.push(userId);
      comment.noOfLikes += 1;
    }

    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};

export const edit = async (req, res, next) => {
  const { content, userId } = req.body;
  const User2 = await User.findOne({ email: req.user.email });
  const User3 = await User.findOne({ _id: req.user.id });

  if (req.user.id) {
    if (userId !== User3._id.toString()) {
      return next(
        errorHandler(403, "You are not allowed to update this comment")
      );
    }
  } else if (req.user.email) {
    if (userId !== User2._id.toString()) {
      return next(
        errorHandler(403, "You are not allowed to update this comment")
      );
    }
  }
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (comment.userId === userId) {
      await Comment.findByIdAndUpdate(
        req.params.commentId,
        { $set: { content: content } },
        { new: true } //the findByIdAndUpdate does not requires the save() propertie
      );
      res.status(200).json("comment updated successfully");
    } else {
      return next(errorHandler(402, "Can't Update Comment right Now"));
    }
  } catch (error) {
    next(error);
  }
};

export const CommentDelete = async (req, res, next) => {
  console.log("delete hit");
  try {
    const { commentId } = req.params; // Get commentId from request parameters
    const { id: authUserId, email: authUserEmail } = req.user; // Get authenticated user details from req.user

    // Fetch the authenticated user from the database
    console.log("delete start");
    const authenticatedUser = await User.findById(authUserId);

    // Check if the authenticated user exists
    if (!authenticatedUser) {
      return next(errorHandler(403, "User not authenticated"));
    }

    // Fetch the comment and populate its userId to get the comment owner details
    const comment = await Comment.findById(commentId).populate("userId");
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }

    const commentOwner = comment.userId; // Get the owner of the comment

    // Check if the authenticated user is either the owner of the comment or an admin
    if (
      commentOwner._id.toString() !== authUserId.toString() && // Check if comment owner ID matches authenticated user ID
      commentOwner.email !== authUserEmail && // Check if comment owner email matches authenticated user email
      !authenticatedUser.isAdmin // Check if the authenticated user is an admin
    ) {
      return next(
        errorHandler(403, "You are not allowed to delete this comment")
      );
    }

    // If the user has permission, delete the comment
    await Comment.findByIdAndDelete(commentId);
    res.status(200).json("Comment deleted successfully");
  } catch (error) {
    return next(error);
  }
};
