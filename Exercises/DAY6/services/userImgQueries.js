const { where } = require("sequelize");
const { pool } = require("../config/dbConnection");
const userImages=require('../models/userImages');
const userProfiles  = require("../models/userProfile");

const getAllUserImgQuery = async () => {
  const rows = await userImages.findAll();
  return rows;
};

const getUserImgQuery = async (userId) => {
  const rows = await userImages.findAll({where:{userId}});
  return rows;
};

const createUserImgQuery = async (
  userId,
  imageName,
  path,
  mimeType,
  extension,
  size
) => {
  const result = await userImages.create({userId, imageName, path, mimeType, extension, size});
  // const id=result.insertId;
  return result;
};

const deleteUserImgQuery = async (userId) => {
  const result = await userImages.destroy({where:{userId}});
  return result;
};

module.exports = { getAllUserImgQuery,getUserImgQuery,createUserImgQuery, deleteUserImgQuery };
