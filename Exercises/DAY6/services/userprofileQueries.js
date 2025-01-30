const { pool } = require("../config/dbConnection");

const getUsersProfileQuery = async () => {
  const [rows] = await pool.query("SELECT * FROM user_profiles");
  return rows;
};
const getUserProfileByIdQuery = async (id) => {
  const [rows] = await pool.query(
    `SELECT user_profiles.id,user_profiles.userId,user_profiles.bio,user_profiles.linkedInUrl,user_profiles.facebookUrl, user_profiles.instaUrl,user_profiles.updatedAt FROM user_profiles WHERE user_profiles.id = ?`,
    [id]
  );
  return rows[0];
};

const createUserProfileQuery = async ({
  userId,
  bio,
  linkedInUrl,
  facebookUrl,
  instaUrl,
}) => {
  try {
    const [result] = await pool.query(
      `INSERT INTO user_profiles (userId,bio,linkedInUrl,facebookUrl,instaUrl) VALUES (?,?,?,?,?)`,
      [userId, bio, linkedInUrl, facebookUrl, instaUrl]
    );
    const id = result.insertId;
    return getUserProfileByIdQuery(id);
  } catch (error) {
    console.log(error);
  }
};

const updateUserProfileQuery = async (id, updates) => {
  const fields = Object.keys(updates)
    .filter((key) => updates[key] !== undefined)
    .map((key) => `${key}=?`);

  if (fields.length === 0) {
    throw new Error("No fields provided for updates!");
  }

  const values = Object.values(updates).filter((value) => value !== undefined);
  values.push(id);

  const query = `UPDATE user_profiles SET ${fields.join(", ")} WHERE id=?`;
  await pool.query(query, values);

  return getUserProfileByIdQuery(id);
};

const deleteUserProfileQuery = async (id) => {
  const [rows] = await pool.query(`DELETE FROM user_profiles WHERE id = ?`, [
    id,
  ]);
  return rows[0];
};

module.exports = {
  getUsersProfileQuery,
  getUserProfileByIdQuery,
  createUserProfileQuery,
  updateUserProfileQuery,
  deleteUserProfileQuery,
};
