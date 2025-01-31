const { sequelize } = require("../config/dbConnection");
const Users = require("./users");
const UserProfiles = require("./userProfile");
const UserImages = require("./userImages");

// Define Associations
Users.hasOne(UserProfiles, { foreignKey: "userId", onDelete: "CASCADE" });
UserProfiles.belongsTo(Users, { foreignKey: "userId", onDelete: "CASCADE" });

Users.hasMany(UserImages, { foreignKey: "userId", onDelete: "CASCADE" });
UserImages.belongsTo(Users, { foreignKey: "userId", onDelete: "CASCADE" });

// Export models
module.exports = { sequelize, Users, UserProfiles, UserImages };
