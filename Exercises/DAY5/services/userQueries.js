const { pool } = require("../config/dbConnection");


//old code

const getAllUsersQuery=async()=>{
    const[rows]=await pool.query("SELECT * FROM users")
    return rows
}

const getUsersByIdQuery = async (id) => {
  const [rows] = await pool.query(
    `SELECT 
      u.id, u.name, u.email, u.age, u.role, u.isActive, p.bio, p.linkedInUrl, p.facebookUrl, p.instaUrl, i.imageName, i.path,i.mimeType,i.extension,i.size from users u LEFT JOIN user_profiles p ON u.id = p.userId
      LEFT JOIN user_images i ON u.id = i.userId
      WHERE u.id = ?;`,
    [id]
  );
  return rows[0];
};

const createUserQuery=async({name,email,age,role,isActive})=>{
    const [result]=await pool.query(`INSERT INTO users (name,email,age,role,isActive) VALUES (?,?,?,?,?)`,[name,email,age,role,isActive])
    const id=result.insertId;
    return getUsersByIdQuery(id);
}

const updateUserQuery = async (id, updates) => {
  const fields = Object.keys(updates)
    .filter((key) => updates[key] !== undefined)
    .map((key) => `${key}=?`);

  if (fields.length === 0) {
    throw new Error("No fields provided for updates!");
  }

  const values = Object.values(updates).filter((value) => value !== undefined);
  values.push(id);

  const query = `UPDATE users SET ${fields.join(", ")} WHERE id=?`;
  await pool.query(query, values);

  return getUsersByIdQuery(id);
};

const deleteUserQuery=async(id)=>{
    const[rows]=await pool.query(`DELETE FROM users WHERE id = ?`,[id])
    return rows[0]
}



module.exports={getAllUsersQuery,getUsersByIdQuery,createUserQuery,updateUserQuery ,deleteUserQuery};
