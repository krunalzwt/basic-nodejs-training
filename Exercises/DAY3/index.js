const express = require("express");
const dotenv = require("dotenv").config({ path: "../../.env" });
const fs = require("fs");
const app = express();
const { users } = require("./constant");
const port = process.env.DAY3_PORT;
const path = require("path");
const logMiddleware = require("./middleware/log.js");
const idValidation = require("./middleware/idValid.js");

app.use(express.json());
app.use(logMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the user Management API!");
});

app.get("/users", (req, res) => {
  res.status(200).send(users);
});

app.get("/users/:id", idValidation, (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  // const updatedContent = `let users = ${JSON.stringify(users, null, 2)};\n\nmodule.exports = { users };`;

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send("User not found");
  }
});

app.post("/users", (req, res) => {
  const { id, name, email, age, role, isActive } = req.body;
  const newUser = { id, name, email, age, role, isActive };
  // const userExists = users.some(user => user.id === newUser.id);
  if (userExists) {
    return res.send("id already exists!!");
  } else {
    users.push(newUser);
    if (err) {
      return res.status(500).send("Error updating user data");
    }
    res.status(201).send(newUser);
  }
});

app.patch("/users/:id", idValidation, (req, res) => {
  const { name, email, age, role, isActive } = req.body;
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  Object.assign(user, { name, email, age, role, isActive });
  res.json(user);
});

app.delete("/users/:id", idValidation, (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);

  users.splice(userIndex, 1);
  res.status(200).send("successfully deleted!!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
