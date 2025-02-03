const express = require("express");
const dotenv = require("dotenv").config({ path: "../../.env" });
const fs = require("fs");
const app = express();
const port = 8080;
const path = require("path");
const logMiddleware = require("./middleware/log.js");
const {sequelize} = require("./config/dbConnection.js");
const users = require("./models/users.js");
const userProfiles=require('./models/userProfile.js');
const userImages=require('./models/userImages.js');
const cookie_parser=require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logMiddleware);

sequelize
  .sync()
  .then(() => console.log("Database connected and tables created"))
  .catch(err => console.error("database connection failed:", err));

app.use("/", require("./routers/mainRoutes.js"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
