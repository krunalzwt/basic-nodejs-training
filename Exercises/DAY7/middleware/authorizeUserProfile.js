const jwt = require("jsonwebtoken");
const secret = "abc$@123$";

const authorizeUserProfile = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decodedtoken = jwt.verify(token, secret);  
    const userIdFromToken = decodedtoken.id;  

    const userIdFromParams = parseInt(req.body.userId, 10); 

    if (userIdFromToken !== userIdFromParams) {
      return res.status(403).json({ message: "Forbidden: You can only modify your own data." });
    }

    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = authorizeUserProfile;
