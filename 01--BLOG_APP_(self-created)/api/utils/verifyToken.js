import { jwt } from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token == null) {
    return res.status(401);
  }
  jwt.verify(token, process.env.JWT_TOKEN_KEY, (err, user) => {
    if (err) return res.status(403);
    req.user = user;
    next();
  });
};
