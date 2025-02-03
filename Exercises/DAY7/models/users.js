const { DataTypes, STRING } =require("sequelize");
const { sequelize } =require("../config/dbConnection");
const bcrypt=require('bcrypt');


 const User = sequelize.define("User", {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
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
  password:{
    type:DataTypes.STRING,
    allowNull:false,
    set(value){
      if(value){
        const hash=bcrypt.hashSync(value,10);
        this.setDataValue("password",hash);
      }
    }
  }
},
  {
  tableName: "users",
  timestamps: true,
  },
);


module.exports=User;