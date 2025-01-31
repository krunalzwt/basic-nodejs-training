const path = require("path");
const multer = require("multer");
const uploadsDir = path.join(__dirname, "../uploads");
// const { getUsersByIdQuery, createUserQuery, updateUserQuery, deleteUserQuery } = require("../services/userQueries");
const { string } = require("yup");
const users = require("../models/users");
const userProfiles  = require("../models/userProfile");
const userImages = require("../models/userImages");


// user table functions

const root = (req, res) => {
  return res.send("Welcome to the user Management API!");
};

// function to get all users
const getAllUsers = async (req, res) => {
  try {
    const rows = await users.findAll();
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
          attributes: ["bio","linkedInUrl","facebookUrl","instaUrl"],  
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
    const { name, email, age, role, isActive } = req.body;
    if(typeof(isActive)==="string"){
      return res.status(500).send("isActive must be boolean!");
    }
    const result = await users.create({name, email, age, role, isActive});
    // const id = result.insertId;
    return res.status(201).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};

// function to update the user by id
const updateUserById = async (req, res,updates) => {
  try {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    if (typeof id !== "number" || isNaN(id)) {
      throw new Error(`Invalid ID type: ${typeof id}`);
    }

    const [updated] = await users.update(updates, {
      where: { id },
    });

    if (updated === 0) {
      return null; 
    }

    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found or no changes made" });
    }
    
    return await users.findByPk(id);
    // return res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating the user:", err);
    return res.status(500).json({ message: "Error updating the user!" });
  }
};


// FUNCTION TO DELETE THE USER BY ID
const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await users.destroy({where:{id}});
      res.status(200).send("user deleted successfully!!");
  } catch (error) {
    console.error("Error deleting users:", error);
    return res.status(500).send("Failed to delete users.");
  }
};

module.exports = {
  root,
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUser,
};
