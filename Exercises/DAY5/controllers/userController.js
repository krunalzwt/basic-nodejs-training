const { getUsersByIdQuery } = require("../services/userQueries");


const getUserById = async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await getUsersByIdQuery(userId);
  
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).send("Failed to fetch users.");
    }
  };

  module.exports={getUserById}