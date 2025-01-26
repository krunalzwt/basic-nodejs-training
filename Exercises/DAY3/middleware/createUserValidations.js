const createUserValidations = (req, res, next) => {
    const { id, email, age, role, isActive } = req.body;
  
    // Validate required fields
    if (!id || !email || !age || !role) {
      return res.status(400).send("Missing required fields!");
    }
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Invalid email format!");
    }
  
    // Validate role (Admin or User)
    const validRoles = ["Admin", "User"];
    if (!validRoles.includes(role)) {
      return res.status(400).send("Invalid role! Role must be either Admin or User.");
    }
  
    // Validate isActive (must be a boolean value)
    if (typeof isActive !== "boolean") {
      return res.status(400).send("Invalid isActive value! It must be true or false.");
    }
  
    next(); // Pass control to the next middleware or route handler
  };
  
  module.exports = createUserValidations;
  