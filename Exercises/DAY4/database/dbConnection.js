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

const updateNode=async(id,updates)=>{
    const feilds=[]
    const values=[]

    if(updates.name){
        feilds.push("name=?");
        values.push(updates.name);
    }
    if(updates.email){
        feilds.push("email=?");
        values.push(updates.email);
    }
    if(updates.age){
        feilds.push("age=?");
        values.push(updates.age);
    }
    if(updates.role){
        feilds.push("role=?");
        values.push(updates.role);
    }
    if(updates.isActive){
        feilds.push("isActive=?");
        values.push(updates.isActive);
    }

    if(feilds.length===0){
        throw new Error('no feilds provided for updates!');
    }

    values.push(id);

    const query=`UPDATE users SET ${feilds.join(", ")} WHERE id=?`;
    await pool.query(query,values);

    return getNode(id);
}

const deleteNode=async(id)=>{
    const[rows]=await pool.query(`DELETE FROM users WHERE id = ?`,[id])
    return rows[0]
}



module.exports={getNode,getNodes,createNode,updateNode ,deleteNode};

// const [rows]=await pool.query("SELECT * FROM users");
// console.log(rows);