const express = require("express");
const dotenv = require("dotenv").config({ path: "../../.env" });
const fs = require("fs");
const app = express();
const port = process.env.DAY3_PORT || 8080;
const path = require("path");
const logMiddleware = require("./middleware/log.js");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(logMiddleware);

app.use('/',require('./routers/mainRoutes.js'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
