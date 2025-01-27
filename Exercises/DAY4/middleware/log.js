const fs = require("fs");
const path = require("path");

const logMiddleware = (req, res, next) => {
  const { method, url } = req;
  const timestamp = new Date();
  const filepath = path.join(__dirname, "../logs.txt");
  const format = `Method: ${method}\nTimestamp: ${timestamp}\nMessage: ${JSON.stringify(req.body)}\n`;
  fs.appendFile(filepath, `${format}\n`, (err) => {
    if (err) {
      console.log(err);
    } else {
      next();
    }
  });
};

module.exports = logMiddleware;
