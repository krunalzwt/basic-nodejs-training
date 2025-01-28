const createUserValidations = (req, res, next) => {
    const { id, email, age, role, isActive } = req.body;
  
    // if (!email || !age || !role) {
    //   return res.status(400).send("Missing required fields!");
    // }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Invalid email format!");
    }
  
    const validRoles = ["Admin", "User"];
    if (!validRoles.includes(role)) {
      return res.status(400).send("Invalid role! Role must be either Admin or User.");
      
    }
  
    if (typeof isActive !== "boolean") {
      return res.status(400).send("Invalid isActive value! It must be true or false.");
    }

    if (age !== undefined && (typeof age !== "number" || age <= 0)) {
      return res.status(400).send("Invalid age! Age must be a positive number.");
    }
  
    next();
  };
  
  module.exports = createUserValidations;
  