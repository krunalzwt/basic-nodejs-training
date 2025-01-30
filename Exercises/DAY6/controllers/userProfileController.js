const path = require("path");
const multer = require("multer");

const uploadsDir = path.join(__dirname, "./uploads");
const {
  getUsersProfileQuery,
  getUserProfileByIdQuery,
  createUserProfileQuery,
  updateUserProfileQuery,
  deleteUserProfileQuery,
} = require("../services/userprofileQueries.js");


const root = (req, res) => {
  res.send("Welcome to the user Management API!");
};

const getAllUsersProfile = async (req, res) => {
  try {
    const users = await getUsersProfileQuery();
    res.json(users);  
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).send("Failed to fetch users.");
  }
};

const getUserProfileById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await getUserProfileByIdQuery(userId);

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

const createUserProfile = async (req, res) => {
  try {
    const { userId, bio, linkedInUrl, facebookUrl, instaUrl } = req.body;

    const newUser = {
      userId,
      bio,
      linkedInUrl,
      facebookUrl,
      instaUrl,
    };

    const user = await createUserProfileQuery(newUser);

    res.status(201).send(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).send("Error creating user!");
  }
};

//idvalidationF
const updateUserProfile = async (req, res) => {
  try {
    const { userId, bio, linkedInUrl, facebookUrl, instaUrl } = req.body;
    const bodyId = parseInt(req.params.userId);

    if(!bodyId){
      return res.status(500).send('userId does not exists!');
    }

    const updateUser = await updateUserProfileQuery(bodyId, {
      userId,
      bio,
      linkedInUrl,
      facebookUrl,
      instaUrl,
    });
    res.status(200).json(updateUser);
    // res.status(200).send(`user updated ${JSON.stringify(updateUser)}`);
  } catch (err) {
    console.error("Error updaing the user", err);
    return res.status(500).send("Error upading the user!");
  }
};

//idvalidationF
const deleteUserProfile = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await deleteUserProfileQuery(userId);

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
