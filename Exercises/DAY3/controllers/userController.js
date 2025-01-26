const { users } = require("../constant");
const path = require("path");

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

    //   if (age) {
    //     const parsedAge = parseInt(age);
    //     if (!isNaN(parsedAge)) {
    //       filteredUsers = filteredUsers.filter((user) => user.age === parsedAge);
    //     } else {
    //       return res
    //         .status(400)
    //         .json({ message: "Invalid age query parameter." });
    //     }
    //   }

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

module.exports = {
  root,
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUser,
};
