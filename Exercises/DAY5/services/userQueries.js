const { pool } = require("../config/dbConnection");

const getUsersByIdQuery = async (id) => {
  const [rows] = await pool.query(
    `SELECT 
      u.id, u.name, u.email, u.age, u.role, u.isActive, p.bio, p.linkedInUrl, p.facebookUrl, p.instaUrl, i.imageName, i.path,i.mimeType,i.extension,i.size from users u LEFT JOIN user_profiles p ON u.id = p.userId
      LEFT JOIN user_images i ON u.id = i.userId
      WHERE u.id = ?;`,
    [id]
  );
  return rows[0];
};

module.exports = { getUsersByIdQuery };
