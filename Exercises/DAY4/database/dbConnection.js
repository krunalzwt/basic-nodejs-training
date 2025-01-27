const mysql = require('mysql2');
const dotenv=require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
}).promise();

const getNodes=async()=>{
    const[rows]=await pool.query("SELECT * FROM users")
    return rows
}
const getNode=async(id)=>{
    const[rows]=await pool.query(`SELECT * FROM users WHERE id = ?`,[id])
    return rows[0]
}

const createNode=async({name,email,age,role,isActive})=>{
    const [result]=await pool.query(`INSERT INTO users (name,email,age,role,isActive) VALUES (?,?,?,?,?)`,[name,email,age,role,isActive])
    const id=result.insertId;
    return getNode(id);
}



module.exports={getNode,getNodes,createNode}

// const [rows]=await pool.query("SELECT * FROM users");
// console.log(rows);