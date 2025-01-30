const { DataTypes, STRING } = require('sequelize');
const {sequelize}=require('../config/dbConnection');

const userImages=sequelize.define('user_images',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    imageName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    path:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    mimeType:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    extension:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    size:{
        type:DataTypes.NUMBER,
        allowNull:false,
    },
},{
    timestamps:true,
    tableName:'user_images',
});

userImages.associate = (models) => {
    userImages.belongsTo(models.users, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
    });
};

module.exports={userImages};