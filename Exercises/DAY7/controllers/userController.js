const path = require("path");
const multer = require("multer");
const uploadsDir = path.join(__dirname, "../uploads");
const { string } = require("yup");
const users = require("../models/users");
const userProfiles = require("../models/userProfile");
const userImages = require("../models/userImages");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { setUser, getUser } = require("../services/auth");

// user table functions

const root = (req, res) => {
  return res.send("Welcome to the user Management API!");
};

// function to get all users
const getAllUsers = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const { role, isActive, ageGt, orderByColumn, order } = req.query;
    const conditions = {};
    if (role) {
      conditions.role = role;
    }
    if (isActive !== undefined) {
      conditions.isActive = isActive === "true";
    }
    if (ageGt) {
      conditions.age = { [Op.gt]: parseInt(ageGt) };
    }

    const orderArray = [];
    if (orderByColumn && order) {
      orderArray.push([orderByColumn, order.toUpperCase()]);
    }

    const rows = await users.findAll({  where: conditions,
      limit,
      offset,
      order:orderArray,
    });

    if (rows.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    return res.json(rows);

  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).send("Failed to fetch users.");
  }
};

// function to get user by id
const getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).send("Invalid User ID");
    }
    const user = await users.findOne({
      where: { id: userId },
      include: [
        {
          model: userProfiles,
          attributes: ["bio", "linkedInUrl", "facebookUrl", "instaUrl"],
        },
        {
          model: userImages,
          attributes: ["imageName"],
        },
      ],
    });
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

// function to create a user
const createUser = async (req, res) => {
  try {
    const { name, email, age, role, isActive, password } = req.body;
    if (typeof isActive === "string") {
      return res.status(500).send("isActive must be boolean!");
    }
    const result = await users.create({
      name,
      email,
      age,
      role,
      isActive,
      password,
    });
    // const id = result.insertId;
    return res.status(201).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const updateUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const updates = req.body;
    const user = await users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const [updated] = await users.update(updates, {
      where: { id: userId },
    });

    if (updated === 0) {
      return res
        .status(404)
        .json({ message: "User not found or no changes made" });
    }

    const updatedUser = await users.findByPk(userId);
    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating the user:", err);
    return res.status(500).json({ message: "Error updating the user!" });
  }
};

// FUNCTION TO DELETE THE USER BY ID
const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await users.destroy({ where: { id } });
    res.status(200).send("user deleted successfully!!");
  } catch (error) {
    console.error("Error deleting users:", error);
    return res.status(500).send("Failed to delete users.");
  }
};

// Login and Signup By Credentials

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await users.findOne({
      where: { email: username },
    });
    if (!user) {
      return res.status(404).send("no user found!");
    } else {
      const verify = bcrypt.compareSync(password, user.password);
      if (verify) {
        const token = setUser(user);
        console.log(token);
        return res.status(200).json({ message: "Login successful!", token });
      } else {
        return res.status(403).send("Incorrect password!");
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "An error occurred during login." });
  }
};

module.exports = {
  root,
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUser,
  login,
};
