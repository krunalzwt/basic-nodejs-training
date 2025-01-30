const { pool } = require("../config/dbConnection");
const { userProfiles } = require("../models/userProfile");

const getUsersProfileQuery = async () => {
  const rows = await userProfiles.findAll();
  return rows;
};

const getUserProfileByIdQuery = async (id) => {
  const rows = await userProfiles.findByPk(id);
  return rows;
};

const createUserProfileQuery = async ({
  userId,
  bio,
  linkedInUrl,
  facebookUrl,
  instaUrl,
}) => {
  const result = await userProfiles.create({
    userId,
    bio,
    linkedInUrl,
    facebookUrl,
    instaUrl,
  });
  // const id = result.insertId;
  return result;
};

const updateUserProfileQuery = async (id, updates) => {
  try {
    if (typeof id !== "number" || isNaN(id)) {
      throw new Error(`Invalid ID type: ${typeof id}`);
    }

    const [updated] = await userProfiles.update(updates, {
      where: { id },
    });

    if (updated === 0) {
      return null;
    }

    return await userProfiles.findByPk(id);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const deleteUserProfileQuery = async (id) => {
  const rows = await userProfiles.destroy({where:{id}});
  return rows;
};

module.exports = {
  getUsersProfileQuery,
  getUserProfileByIdQuery,
  createUserProfileQuery,
  updateUserProfileQuery,
  deleteUserProfileQuery,
};
