import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  // Check if the token is present
  if (token == null) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided." });
  }

  jwt.verify(token, process.env.JWT_TOKEN_KEY, (err, user) => {
    if (err) {
      // Handle verification errors
      console.error(err);
      return res.status(403).json({ message: "Forbidden: Invalid token." });
    }

    // Attach the decoded user to the request
    req.user = user;

    // Optionally, validate the decoded user here (e.g., check if user exists)

    // Proceed to the next middleware or route handler
    next();
  });
};
