import jwt from "jsonwebtoken";

export default function checkAuth(req, res, next) {
  if (req.method === "OPTIONS") {
    next();
    return;
  }

  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decoded.userId };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
