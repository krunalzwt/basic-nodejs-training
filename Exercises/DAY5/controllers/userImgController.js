const path = require("path");
const multer = require("multer");

const {
    getAllUserImgQuery,
    getUserImgQuery,
    createUserImgQuery,
    deleteUserImgQuery,
} = require("../services/userImgQueries");

const getUserImgById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await getUserImgQuery(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Failed to fetch users.");
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

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

const uploadImg = async (req, res) => {
  try {
    if (req.file) {
      // const { id } = parseInt(req.params.id);
      const id2 = req.params.id;
      const userId = parseInt(id2);
      // console.log(id,req.file.filename, req.file.path, req.file.mimetype, path.extname(req.file.originalname), req.file.size);
      const user = await createUserImgQuery(
        userId,
        req.file.filename,
        req.file.path,
        req.file.mimetype,
        path.extname(req.file.originalname),
        req.file.size
      );
      if (!user) {
        return res.status(404).json({ error: "User not found!" });
      }

      // user.profilePath = req.file.path;
      return res.status(200).json({ message: "Successfully uploaded!" });
    }

    return res
      .status(400)
      .json({ error: "No file uploaded or invalid file type!" });
  } catch (err) {
    console.error("err uploading a file", err);
  }
};

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

const deleteUserImg = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (userId) {
      const user = await deleteUserImgQuery(userId);
      res.status(200).send("user deleted successfully!!");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error deleting users:", error);
    res.status(500).send("Failed to delete users.");
  }
};

const getAllUsersImg = async (req, res) => {
  try {
    const users = await getAllUserImgQuery();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Failed to fetch users.");
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
