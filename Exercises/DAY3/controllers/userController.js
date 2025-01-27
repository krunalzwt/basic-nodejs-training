const { users } = require("../constant");
const path = require("path");
const multer=require('multer');
// const __dirname=path.resolve();
const uploadsDir=path.join(__dirname,'./uploads')

const root = (req, res) => {
  res.send("Welcome to the user Management API!");
};

  const getAllUsers = (req, res) => {
    if (users) {
      let { ageGt, role, isActive,ageLt,ageEq } = req?.query;

      let filteredUsers = users;

      if (role) {
        filteredUsers = filteredUsers.filter(
          (user) => user.role.toLowerCase() === role.toLowerCase()
        );
      }

      if (isActive) {
        filteredUsers = filteredUsers.filter(
          (user) => user.isActive === (isActive === "true")
        );
      }

      if (ageGt) {
        const parsedAgeGt = parseInt(ageGt);
        if (!isNaN(parsedAgeGt)) {
          filteredUsers = filteredUsers.filter((user) => user.age > parsedAgeGt);
        } else {
          return res.status(400).json({ message: "Invalid ageGt query parameter." });
        }
      }

      if (ageLt) {
        const parsedAgeLt = parseInt(ageLt);
        if (!isNaN(parsedAgeLt)) {
          filteredUsers = filteredUsers.filter((user) => user.age < parsedAgeLt);
        } else {
          return res.status(400).json({ message: "Invalid ageLt query parameter." });
        }
      }

      if (ageEq) {
        const parsedAgeEq = parseInt(ageEq);
        if (!isNaN(parsedAgeEq)) {
          filteredUsers = filteredUsers.filter((user) => user.age === parsedAgeEq);
        } else {
          return res.status(400).json({ message: "Invalid ageEq query parameter." });
        }
      }

      
      if (filteredUsers.length === 0) {
        return res.status(404).json({ message: "No users found." });
      }
      
      return res.status(200).json({ users: filteredUsers });

    } else {
      return res.status(404).json({ message: "No users found." });
    }
  };

const getUserById = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  // const updatedContent = `let users = ${JSON.stringify(users, null, 2)};\n\nmodule.exports = { users };`;

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send("User not found");
  }
};

const createUser = (req, res) => {
  try {
    const { id, name, email, age, role, isActive, number } = req.body;

    const userExists = users.some((user) => user.id === id);
    if (userExists) {
      return res.status(400).send("ID already exists!");
    }

    const newUser = {
      id,
      name,
      email,
      age,
      role,
      isActive: isActive || false,
      number,
    };
    users.push(newUser);

    res.status(201).send(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user!");
  }
};

//idvalidationF
const updateUserById = (req, res) => {
  const { name, email, age, role, isActive } = req.body;
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  Object.assign(user, { name, email, age, role, isActive });
  res.json(user);
};

//idvalidationF
const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.send("user not found!!");
  }
  users.splice(userIndex, 1);
  res.status(200).send("successfully deleted!!");
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
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only images are allowed!'), false); 
    }
    cb(null, true); 
  }
});


const uploadImg = (req, res) => {
  if (req.file) {
    const { id } = req.params;
    const user = users.find((u) => u.id === parseInt(id));

    if (!user) {
      return res.status(404).json({ error: 'User not found!' });
    }

    user.profilePath = req.file.path; 
    return res.status(200).json({ message: 'Successfully uploaded!' });
  }

  return res.status(400).json({ error: 'No file uploaded or invalid file type!' });
};


const handleError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size should be less than 2 MB!' });
    }
  } else if (err.message === 'Only images are allowed!') {
    return res.status(400).json({ error: 'Only images are allowed!' });
  }else if(files.length!==1){
    res.status(500).json({error:'only single file allowed!!'});
  }


  return res.status(500).json({ error: 'An unexpected error occurred!' });
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
  handleError
};
