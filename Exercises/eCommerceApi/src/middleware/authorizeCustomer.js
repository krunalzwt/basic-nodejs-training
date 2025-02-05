const jwt = require("jsonwebtoken");
const users = require("../models/usersModel");
const secret = "abc$@123$";

const authorizeCustomer = async(req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decodedtoken = jwt.verify(token, secret);  
    const userIdFromToken = decodedtoken.id;  
    const user=await users.findByPk(userIdFromToken);  
    
    if (user.role !== 'customer') {
      return res.status(403).json({ message: "Forbidden: only Customers can do this operation" });
    }
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token!!." });
  }
};

module.exports = authorizeCustomer;
