import jwt from'jsonwebtoken'

// tao token khi login
const MAX_SESSION_SECONDS = 15 * 24 *60 * 60; 

const generateToken = (payload, expiresIn = '2d',) => {
    return jwt.sign(payload,process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || expiresIn});
}


const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

export default { generateToken,verifyToken,MAX_SESSION_SECONDS };