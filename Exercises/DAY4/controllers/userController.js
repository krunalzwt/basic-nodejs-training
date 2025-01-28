// const { users } = require("../constant");
const path = require("path");
const multer = require("multer");
// const __dirname=path.resolve();
const uploadsDir = path.join(__dirname, "./uploads");
const { getNodes, getNode, createNode,updateNode,deleteNode } = require("../database/usertableQueries.js");

const root = (req, res) => {
  res.send("Welcome to the user Management API!");
};

const getAllUsers = async (req, res) => {
  try {
    const users = await getNodes();
    res.json(users); // Ensure the correct variable is sent in the response
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Failed to fetch users.");
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await getNode(userId);

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

const createUser = async (req, res) => {
  try {
    const { name, email, age, role, isActive } = req.body;

    const newUser = {
      name,
      email,
      age,
      role,
      isActive: isActive || false,
    };

    const user = await createNode(newUser);

    res.status(201).send(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user!");
  }
};

//idvalidationF
const updateUserById = async(req, res) => {
  try{
    const { name, email, age, role, isActive } = req.body;
    const userId = parseInt(req.params.id);

    const updateUser=await updateNode(userId,{name,email,age,role,isActive});
    res.status(200).json(updateUser);
    // res.status(200).send(`user updated ${JSON.stringify(updateUser)}`);
  }catch(err){
    console.error('Error updaing the user',err);
    res.status(500).send('Error upading the user!');
  }
};

//idvalidationF
const deleteUser = async(req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await deleteNode(userId);
    
    if (!user) {
      res.status(200).send("user deleted successfully!!");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error deleting users:", error);
    res.status(500).send("Failed to delete users.");
  }
};



//img upload
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

const uploadImg =async(req, res) => {
  try{
    if (req.file) {
      const { id } = req.params;
      const user = await getNode(id);
  
      if (!user) {
        return res.status(404).json({ error: "User not found!" });
      }
  
      user.profilePath = req.file.path;
      return res.status(200).json({ message: "Successfully uploaded!" });
    }
  
    return res
      .status(400)
      .json({ error:"No file uploaded or invalid file type!" });
  }catch(err){
    console.error("err uploading a file",err);
  }
};

const handleError = (err, req, res, next) => {
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



module.exports = {
  root,
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUser,
  uploadImg,
  upload,
  handleError,
};
