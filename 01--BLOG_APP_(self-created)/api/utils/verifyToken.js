import jwt, { decode } from "jsonwebtoken";
import errorHandler from "./error.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }

  try {
    jwt.verify(token, process.env.JWT_TOKEN_KEY, (err, decode) => {
      if (err) {
        return next(errorHandler(403, "Unauthorized"));
      } else {
        req.user = decode;
      }
    }); // Use async/await
    // req.user = user;
    next();
  } catch (err) {
    console.error("Error verifying token:", err);
    return next(errorHandler(401, "Unauthorized"));
  }
};
