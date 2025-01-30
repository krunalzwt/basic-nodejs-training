const path = require("path");
const multer = require("multer");
const uploadsDir = path.join(__dirname, "../uploads");
const { getUsersByIdQuery, getAllUsersQuery, createUserQuery, updateUserQuery, deleteUserQuery } = require("../services/userQueries");
const { string } = require("yup");


// user table functions

const root = (req, res) => {
  return res.send("Welcome to the user Management API!");
};

// function to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersQuery();
    return res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).send("Failed to fetch users.");
  }
};

// function to get user by id
const getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await getUsersByIdQuery(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).send("Failed to fetch users.");
  }
};

// function to create a user
const createUser = async (req, res) => {
  try {
    const { name, email, age, role, isActive } = req.body;
    if(typeof(isActive)==="string"){
      return res.status(500).send("isActive must be boolean!");
    }
    const newUser = {
      name,
      email,
      age,
      role,
      isActive: isActive || false,
    };
    console.log(typeof(isActive))
    
    const user = await createUserQuery(newUser);

    res.status(201).send(user);
  } catch (error) {
    // console.error("Error creating user:", error);
    return res.status(500).send(error);
    
  }
};

// function to update the user by id
const updateUserById = async (req, res) => {
  try {
    const { name, email, age, role, isActive } = req.body;
    const userId = parseInt(req.params.id);

    const updateUser = await updateUserQuery(userId, {
      name,
      email,
      age,
      role,
      isActive,
    });
    res.status(200).json(updateUser);
    
  } catch (err) {
    console.error("Error updaing the user", err);
    return res.status(500).send("Error upading the user!");
  }
};


// FUNCTION TO DELETE THE USER BY ID
const deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
      const user = await deleteUserQuery(userId);
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
