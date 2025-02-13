const users=require('../models/usersModel');
const {setUser,getUser}=require('../services/auth');
const bcrypt=require('bcrypt');


const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await users.findOne({
      where: { email: username },
    });
    if (!user) {
      return res.status(404).send("no user found!");
    } else {
      const verify = bcrypt.compareSync(password, user.password);
      if (verify) {
        const token = setUser(user);
        return res.status(200).json({ message: "Login successful!", token,role:user.role });
      } else {
        return res.status(403).send("Incorrect password!");
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "An error occurred during login." });
  }
};  


const signup = async(req, res) => {
    try {
      const { first_name,last_name, email, password, role} = req.body;
      const result = await users.create({
        first_name,
        last_name,
        email,
        password,
        role
      });
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
};
  
  module.exports = {
    login,
    signup
  };
  