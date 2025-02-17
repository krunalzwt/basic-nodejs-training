const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnection");
const categories = require("./categoriesModel");

const products = sequelize.define(
  "products",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique:true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    category_id: {   
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: categories,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    image_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

 
categories.hasMany(products, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});
products.belongsTo(categories, { foreignKey: "category_id" });

module.exports = products;
