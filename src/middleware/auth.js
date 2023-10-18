const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  console.log(req.headers);

  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  try {
    const decodedToken = jwt.verify(token, "your_secret_key");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).json({ message: "Authentication failed" });
  }
};
