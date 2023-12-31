const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {UnauthorizedError} = require('../errors');

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthorizedError('Unauthorized to login..')
    }
    const token = authHeader.split(' ')[1];
    

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRETE);
        req.user = {userId:payload.userId, name:payload.name}
        next()
    } catch (error){
        throw new UnauthorizedError('Unauthorized to login')
    }
}

module.exports = auth;