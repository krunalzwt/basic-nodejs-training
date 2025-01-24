const { users } = require("../constant");

const idValidation = (req, res, next) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(400).send("User does not exist");
  } else {
    next();
  }
};

module.exports = idValidation;
