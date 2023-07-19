const jwt = require('jsonwebtoken')
const {secret} = require('./../config/JWT.config')
const {getToken} = require("../utils/authToken")



module.exports = function (req, res, next){
    if (req.method === "OPTIONS"){
        next()
    }
    
    try {
        // todo: create function. that gets request anf returns token from headers or cookie
        // const tooken = getTokenFromRequest(req)
        const token = req.headers.authorization?.split(' ')[1] || getToken(req);
        console.log(token);
        if (!token){
            return res.status(401).json({message: "Forbidden"});
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "Користувач не авторизований"})
    }
}