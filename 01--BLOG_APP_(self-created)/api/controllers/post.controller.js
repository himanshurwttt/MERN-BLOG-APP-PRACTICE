import slugify from "slugify";
import errorHandler from "../utils/error.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const createPost = async (req, res, next) => {
  const { title, content, image } = req.body;
  if (!content || !title || title === "" || content === "") {
    return next(
      errorHandler(400, "title ,Content is required to proceed this post")
    );
  }
  const user = await User.findById(req.params.userId);
  const User2 = await User.findOne({ email: req.user.email });

  if (user._id.toString() !== User2._id.toString()) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }

  if (!user.isAdmin) {
    return next(errorHandler(401, "User not authorized, please login again"));
  }
  try {
    const slug = slugify(title, { lower: true, strict: true });
    const newPost = new Post({
      title,
      slug,
      content,
      image,
      userId: req.params.userId,
    });
    await newPost.save();
    res.status(200).json({ message: "Created post Successfully" });
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order == "asc" ? 1 : -1;
    const post = await Post.find({
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .limit(limit)
      .skip(startIndex);

    const totalPosts = await Post.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getDate(),
      now.getFullYear(),
      now.getMonth() - 1
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      post,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    return next(error);
  }
};
