const { Sequelize } = require('sequelize');
const dotenv = require("dotenv");
dotenv.config();

// const pool = mysql
//   .createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//   })
//   .promise();

// // user table creation query
// pool.query(
//   `CREATE TABLE IF NOT EXISTS users
//   (id INT AUTO_INCREMENT PRIMARY KEY,
//   name TEXT NOT NULL,
//   email VARCHAR(255) UNIQUE,
//   age INT,
//   role VARCHAR(255),
//   isActive BOOLEAN,
//   createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//   updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`
// );

// // user_profiles
// pool.query(
//   `CREATE TABLE IF NOT EXISTS user_profiles (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       userId INT UNIQUE,
//       bio TEXT NOT NULL,
//       linkedInUrl VARCHAR(255) NOT NULL,
//       facebookUrl VARCHAR(255) NOT NULL,
//       instaUrl VARCHAR(255) NOT NULL,
//       createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       FOREIGN KEY (userId) REFERENCES users(id)
//       );`
// );

// // user_images
// pool.query(
//   `CREATE TABLE IF NOT EXISTS user_images (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       userId INT,
//       imageName VARCHAR(255) NOT NULL,
//       path VARCHAR(255) NOT NULL,
//       mimeType VARCHAR(255) NOT NULL,
//       extension VARCHAR(255) NOT NULL,
//       size BIGINT NOT NULL,
//       createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       FOREIGN KEY (userId) REFERENCES users(id)
//       );`
// );

const sequelize =new Sequelize ({
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  dialect:'mysql',
  pool:{
    max:5,
    min:0,
    acquire:30000,
    idle:10000
  }
});

 
module.exports = {sequelize};
