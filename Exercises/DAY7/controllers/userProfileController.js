const path = require("path");
const multer = require("multer");
const userProfiles = require("../models/userProfile");

const {
  getUsersProfileQuery,
  getUserProfileByIdQuery,
  createUserProfileQuery,
  updateUserProfileQuery,
  deleteUserProfileQuery,
} = require("../services/userprofileQueries.js");

const root = (req, res) => {
  res.send("Welcome to the user Profile Management API!");
};

const getAllUsersProfile = async (req, res) => {
  try {
    const rows = await userProfiles.findAll();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).send("Failed to fetch users.");
  }
};

const getUserProfileById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const rows = await userProfiles.findByPk(id);
    if (rows) {
      res.status(200).json(rows);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).send("Failed to fetch users.");
  }
};

const createUserProfile = async (req, res) => {
  try {
    const { userId, bio, linkedInUrl, facebookUrl, instaUrl } = req.body;

    const result = await userProfiles.create({
      userId,
      bio,
      linkedInUrl,
      facebookUrl,
      instaUrl,
    });
      // const id = result.insertId;
    return res.status(201).send(result);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).send("Error creating user!");
  }
};

//idvalidationF
const updateUserProfile = async (req, res) => {
  try {
    const userId = parseInt(req.body.userId, 10);
    const updates = { ...req.body };
    delete updates.userId; // Ensure userId is not included in updates

    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid updates provided" });
    }

    const userExists = await userProfiles.findOne({ where: { userId } }); // Use userId instead of id
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const [updated] = await userProfiles.update(updates, {
      where: { userId }, // Ensure updates are based on userId
      individualHooks: true,
    });

    if (updated === 0) {
      return res.status(400).json({ message: "No changes detected" });
    }

    const updatedUser = await userProfiles.findOne({ where: { userId } }); // Retrieve updated user by userId
    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ message: "Error updating the user!" });
  }
};


//idvalidationF
const deleteUserProfile = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await userProfiles.destroy({where:{id}});

    if (!user) {
      res.status(200).send("user deleted successfully!!");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error deleting users:", error);
    return res.status(500).send("Failed to delete users.");
  }
};

module.exports = {
  root,
  getAllUsersProfile,
  getUserProfileById,
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
