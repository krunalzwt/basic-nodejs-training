const { DataTypes, STRING } = require("sequelize");
const { sequelize } = require("../config/dbConnection");
const bcrypt = require("bcrypt");

const users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(500),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      set(value) {
        if (value) {
          const hash = bcrypt.hashSync(value, 10);
          this.setDataValue("password", hash);
        }
      },
    },
    role: {
      type: DataTypes.ENUM("admin", "customer"),
      defaultValue:"customer",
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = users;
