const express = require("express");
const dotenv = require("dotenv").config({ path: "../../.env" });
const fs = require("fs"); // Import the fs module
const app = express();
const { users } = require("./constant");
const port = process.env.DAY3_PORT;

app.use(express.json()); // to parse JSON bodies in POST requests

app.get("/", (req, res) => {
  res.send("Welcome to the user Management API!");
});

app.get("/users", (req, res) => {
  res.status(200).send(users);
});

app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send("User not found");
  }
});

app.post("/users", (req, res) => {
  const { id, name, email, age, role, isActive } = req.body;
  const newUser = { id, name, email, age, role, isActive };
  users.push(newUser);
  const updatedContent = `let users = ${JSON.stringify(users, null, 2)};\n\nmodule.exports = { users };`;

  fs.writeFile("./constant.js", updatedContent, (err) => {
    if (err) {
      return res.status(500).send("Error updating user data");
    }
    res.status(201).send(newUser);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
