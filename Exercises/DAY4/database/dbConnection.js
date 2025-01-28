const mysql = require('mysql2');
const dotenv=require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
}).promise();

pool.query(`CREATE TABLE IF NOT EXISTS
    users (
        id integer PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        age integer,
        role VARCHAR(255),
        isActive BOOLEAN
    );`
);

pool.query(
    `CREATE TABLE IF NOT EXISTS user_images (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT,
      imageName VARCHAR(255) NOT NULL,
      path VARCHAR(255) NOT NULL,
      mimeType VARCHAR(255) NOT NULL,
      extension VARCHAR(255) NOT NULL,
      size BIGINT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
      );`
  );

module.exports={pool};

// const [rows]=await pool.query("SELECT * FROM users");
// console.log(rows);