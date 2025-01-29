// const { users } = require("../constant");
const {pool}=require('../config/dbConnection');


const idValidation = async(req, res, next) => {
  const id = parseInt(req.body.userId);
  const user=await pool.query(`SELECT * FROM users WHERE id=?`,[id]);
  // console.log(id);
  // console.log(user);
  // const user = users.find((u) => u.id === id);
  if (user[0].length==0) {
    return res.status(400).send("User does not exist");
  } else {
    next();
  }
};

module.exports = idValidation;
