const { DataTypes } =require("sequelize");
const { sequelize } =require("../config/dbConnection");


 const User = sequelize.define("User", {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("Admin", "User"),
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
},
  {
  tableName: "users",
  timestamps: true,
  },
);


module.exports=User;