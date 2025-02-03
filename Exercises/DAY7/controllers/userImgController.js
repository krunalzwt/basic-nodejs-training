const path = require("path");
const multer = require("multer");
const uploadsDir = path.join(__dirname, "../uploads");
const userImages=require('../models/userImages');
const userProfiles  = require("../models/userProfile");

// const {
//     getAllUserImgQuery,
//     getUserImgQuery,
//     createUserImgQuery,
//     deleteUserImgQuery,
// } = require("../services/userImgQueries");


// user_images table functions

// GET ALL USER IMAGES
const getAllUsersImg = async (req, res) => {
  try {
    const users = await userImages.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).send("Failed to fetch users.");
  }
};


// GET USER IMAGES BY ID
const getUserImgById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await userImages.findAll({where:{userId}});

    if (user.length>0) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).send("Failed to fetch users.");
  }
};

// MULTER : FILENAME AND STORAGE FUNCTION
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// MULTER: FILESIZE,EXTENSION AND STORAGE VALIDATIONS
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only images are allowed!"), false);
    }
    cb(null, true);
  },
});

// IMG UPLOADE FUNCTION
const uploadImg = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded or invalid file type!" });
    }

    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID!" });
    }
    const userExists = await userProfiles.findOne({ where: { userId } });

    if (!userExists) {
      return res.status(404).json({ error: "User not found!" });
    }

    const userImage = await userImages.create({
      userId: userId,
      imageName: req.file.filename,
      path: req.file.path,
      mimeType: req.file.mimetype,
      extension: path.extname(req.file.originalname),
      size: req.file.size,
    });

    return res.status(200).json({ message: "Successfully uploaded!", userImage });
  } catch (err) {
    console.error("Error uploading file:", err);
    return res.status(500).json({ error: "Error uploading file!" });
  }
};


// HANDLE ERROR FUNCTION FOR HANDLING THE ERRORS
const handleErrorImg = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ error: "File size should be less than 2 MB!" });
    }
  } else if (err.message === "Only images are allowed!") {
    return res.status(400).json({ error: "Only images are allowed!" });
  } else if (files.length !== 1) {
    res.status(500).json({ error: "only single file allowed!!" });
  }

  return res.status(500).json({ error: "An unexpected error occurred!" });
};

// DELETE THE USER IMG
const deleteUserImg = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (!userId) {
      return res.status(400).send("Invalid user ID");
    }

    const user = await userImages.destroy({where:{userId}});

    if (!user || (Array.isArray(user) && user.length === 0)) {
      return res.status(404).send("User not found");
    }

    res.status(200).send("User deleted successfully!!");
  } catch (error) {
    console.error("Error deleting users:", error);
    return res.status(500).send("Failed to delete users.");
  }
};


module.exports = {
  uploadImg,
  upload,
  handleErrorImg,
  deleteUserImg,
  getUserImgById,
  getAllUsersImg,
};
