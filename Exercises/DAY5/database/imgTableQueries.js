const {pool} = require('./dbConnection');

const createNodeImg=async(userId,imageName, path, mimeType, extension, size)=>{
    const [result]=await pool.query(`INSERT INTO user_images(userId,imageName, path, mimeType, extension, size) VALUES (?,?,?,?,?,?)`,[userId,imageName, path, mimeType, extension, size])
    // const id=result.insertId;
    return result;
}

module.exports={createNodeImg}