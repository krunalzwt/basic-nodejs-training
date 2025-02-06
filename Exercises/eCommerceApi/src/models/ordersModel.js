const { DataTypes, STRING } = require("sequelize");
const { sequelize } = require("../config/dbConnection");
const users = require("../models/usersModel");

const orders = sequelize.define(
  "orders",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: users,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    total_price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending","shipped","delivered","canceled"),
      defaultValue:"pending",
    },
  },
  {
    tableName: "orders",
    timestamps: true,
    indexes: [
      {
        fields: ["user_id"], // Keeping index for performance (not unique)
      },
    ],
  }
);

users.hasMany(orders, { foreignKey: "user_id", onDelete: "CASCADE" });
orders.belongsTo(users, { foreignKey: "user_id" });


module.exports = orders;
