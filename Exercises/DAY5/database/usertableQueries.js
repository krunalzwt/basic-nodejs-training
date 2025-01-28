const {pool} = require('./dbConnection');


const getNodes=async()=>{
    const[rows]=await pool.query("SELECT * FROM user_profiles")
    return rows
}
const getNode=async(id)=>{
    const[rows]=await pool.query(`SELECT * FROM user_profiles WHERE id = ?`,[id])
    return rows[0]
}

const createNode=async({userId,bio,linkedInUrl,facebookUrl,instaUrl})=>{
    const [result]=await pool.query(`INSERT INTO user_profiles (userId,bio,linkedInUrl,facebookUrl,instaUrl) VALUES (?,?,?,?,?)`,[userId,bio,linkedInUrl,facebookUrl,instaUrl])
    const id=result.insertId;
    return getNode(id);
}

const updateNode=async(id,updates)=>{
    const feilds=[]
    const values=[]

    if(updates.bio){
        feilds.push("bio=?");
        values.push(updates.bio);
    }
    if(updates.linkedInUrl){
        feilds.push("linkedInUrl=?");
        values.push(updates.linkedInUrl);
    }
    if(updates.facebookUrl){
        feilds.push("facebookUrl=?");
        values.push(updates.instaUrl);
    }
    if(updates.instaUrl){
        feilds.push("instaUrl=?");
        values.push(updates.instaUrl);
    }

    if(feilds.length===0){
        throw new Error('no feilds provided for updates!');
    }

    values.push(id);

    const query=`UPDATE user_profiles SET ${feilds.join(", ")} WHERE id=?`;
    await pool.query(query,values);

    return getNode(id);
}

const deleteNode=async(id)=>{
    const[rows]=await pool.query(`DELETE FROM user_profiles WHERE id = ?`,[id])
    return rows[0]
}



module.exports={getNode,getNodes,createNode,updateNode ,deleteNode};