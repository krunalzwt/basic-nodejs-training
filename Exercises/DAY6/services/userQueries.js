const { where } = require("sequelize");
const { pool } = require("../config/dbConnection");
const users = require("../models/users");
const { userProfiles } = require("../models/userProfile");
const { userImages } = require("../models/userImages");


const getAllUsersQuery = async (req, res) => {
  try {
    const rows = await users.findAll();
    return rows;
  } catch (err) {
    return res.status(500).send("error!!");
  }
};

const getUsersByIdQuery = async (userId) => {
    const rows = await users.findOne({
      where: { id },
      include: [
        {
          model: userProfiles, 
          attributes: ['bio', 'linkedInUrl', 'facebookUrl', 'instaUrl'], 
        },
        {
          model: userImages, 
          as: 'userImages', 
          attributes: ['imageName'],
        },
      ],
    });

};

const createUserQuery = async ({ name, email, age, role, isActive }) => {
  const result = await users.create({name, email, age, role, isActive});
  const id = result.insertId;
  return result;
};

const updateUserQuery = async (id, updates) => {
  try {
    if (typeof id !== "number" || isNaN(id)) {
      throw new Error(`Invalid ID type: ${typeof id}`);
    }

    const [updated] = await users.update(updates, {
      where: { id },
    });

    if (updated === 0) {
      return null; 
    }

    return await users.findByPk(id);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};


const deleteUserQuery = async (id) => {
  const rows = await users.destroy({where:{id}});
  return rows;
};

module.exports = {
  getAllUsersQuery,
  getUsersByIdQuery,
  createUserQuery,
  updateUserQuery,
  deleteUserQuery,
};
