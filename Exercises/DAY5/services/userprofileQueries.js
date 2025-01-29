const { pool } = require("../config/dbConnection");

const getUsersProfileQuery = async () => {
  const [rows] = await pool.query("SELECT * FROM user_profiles");
  return rows;
};
const getUserProfileByIdQuery = async (id) => {
  const [rows] = await pool.query(
    `SELECT user_profiles.userId, users.name, users.email, users.age, user_profiles.bio, users.isActive, user_profiles.linkedInUrl,user_profiles.facebookUrl, user_profiles.instaUrl, users.createdAt, user_profiles.updatedAt FROM user_profiles JOIN users ON users.id = user_profiles.userId WHERE user_profiles.id = ?`,
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
  const [result] = await pool.query(
    `INSERT INTO user_profiles (userId,bio,linkedInUrl,facebookUrl,instaUrl) VALUES (?,?,?,?,?) WHERE NOT EXISTS (SELECT 1 FROM user_profiles WHERE userId=?)`,
    [userId, bio, linkedInUrl, facebookUrl, instaUrl]
  );
  const id = result.insertId;
  return getNode(id);
};

const updateUserProfileQuery = async (id, updates) => {
  const feilds = [];
  const values = [];

  if (updates.bio) {
    feilds.push("bio=?");
    values.push(updates.bio);
  }
  if (updates.linkedInUrl) {
    feilds.push("linkedInUrl=?");
    values.push(updates.linkedInUrl);
  }
  if (updates.facebookUrl) {
    feilds.push("facebookUrl=?");
    values.push(updates.instaUrl);
  }
  if (updates.instaUrl) {
    feilds.push("instaUrl=?");
    values.push(updates.instaUrl);
  }

  if (feilds.length === 0) {
    throw new Error("no feilds provided for updates!");
  }

  values.push(id);

  const query = `UPDATE user_profiles SET ${feilds.join(", ")} WHERE id=?`;
  await pool.query(query, values);

  return getNode(id);
};

const deleteUserProfileQuery = async (id) => {
  const [rows] = await pool.query(`DELETE FROM user_profiles WHERE id = ?`, [
    id,
  ]);
  return rows[0];
};

module.exports = { getUsersProfileQuery, getUserProfileByIdQuery, createUserProfileQuery, updateUserProfileQuery, deleteUserProfileQuery };
