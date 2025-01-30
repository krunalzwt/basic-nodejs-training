const { pool } = require("../config/dbConnection");

const getAllUserImgQuery = async () => {
  const [rows] = await pool.query("SELECT * FROM user_images");
  return rows;
};

const getUserImgQuery = async (userId) => {
  const [rows] = await pool.query(`SELECT * FROM user_images WHERE userId=?`,[userId]);
  return rows[0];
};

const createUserImgQuery = async (
  userId,
  imageName,
  path,
  mimeType,
  extension,
  size
) => {
  const [result] = await pool.query(
    `INSERT INTO user_images(userId,imageName, path, mimeType, extension, size) VALUES (?,?,?,?,?,?)`,
    [userId, imageName, path, mimeType, extension, size]
  );
//   const id=result.insertId;
  return result;
};

const deleteUserImgQuery = async (userId) => {
  const [result] = await pool.query(`DELETE FROM user_images WHERE userId=?`, [
    userId,
  ]);
  return result;
};

module.exports = { getAllUserImgQuery,getUserImgQuery,createUserImgQuery, deleteUserImgQuery };
