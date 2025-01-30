const { DataTypes } = require('sequelize');
const {sequelize}=require('../config/dbConnection')

const userProfiles = sequelize.define('user_profiles', {
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
        bio: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        linkedInUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        facebookUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        instaUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: true,  // Add createdAt and updatedAt automatically
        tableName: 'user_profiles',

    });

    userProfiles.associate = (models) => {
        userProfiles.belongsTo(models.users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });
    };

module.exports={userProfiles}