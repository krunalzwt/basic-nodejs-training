const jwt = require("jsonwebtoken");
const users = require("../models/usersModel");
const secret = "abc$@123$";

const root = (req, res) => {
  res.send("Welcome to the eCommerce Project!");
};

const getAllUsers = async (req, res) => {
  try {
    const rows = await users.findAll();
    if (rows.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }
    return res.json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).send("Failed to fetch users.");
  }
};

const getUserById = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const decodedtoken = jwt.verify(token, secret);  
    const userIdFromToken = decodedtoken.id;
    if (isNaN(userIdFromToken)) {
      return res.status(400).send("Invalid User ID");
    }
    const user = await users.findByPk(userIdFromToken);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).send("Failed to fetch user.");
  }
};

const updateUserById = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const decodedtoken = jwt.verify(token, secret);  
    const userIdFromToken = decodedtoken.id;

    if (isNaN(userIdFromToken)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const updates = req.body;
    const user = await users.findByPk(userIdFromToken);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const [updated] = await users.update(updates, {
      where: { id: user.id },
    });

    if (updated === 0) {
      return res
        .status(404)
        .json({ message: "User not found or no changes made" });
    }

    const updatedUser = await users.findByPk(user.id);
    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating the user:", err);
    return res.status(500).json({ message: "Error updating the user!" });
  }
};

module.exports = {
  root,
  getAllUsers,
  getUserById,
  updateUserById
};
