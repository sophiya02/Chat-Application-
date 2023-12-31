
const jwt= require('jsonwebtoken')
const UnauthenticatedError = require('../error/unauthenticated');

const auth = async (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication Invalid')
    }

    const token = authHeader.split(' ')[1];
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {userId: payload.userId,  email: payload.email};
        next();
    }
    catch(err){
        console.log(err)
        throw new UnauthenticatedError('Authentication Invalid')
    }
}

module.exports = auth;
