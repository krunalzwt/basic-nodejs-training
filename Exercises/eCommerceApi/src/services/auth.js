const jwt = require("jsonwebtoken");
const secret = "abc$@123$";

const setUser = (user) => {
    return jwt.sign(
        {
            id: user.id,   
            name: user.name,
            email: user.email
        },
        secret,
        { expiresIn: "6h" }  
    );
};

const getUser = (token) => {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
};

module.exports = { setUser, getUser };
