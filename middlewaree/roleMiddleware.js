const jwt = require('jsonwebtoken')
const {secret} = require('./../config/JWT.config')
const {getToken} = require("../utils/authToken")


module.exports = function (roles){
    return function(req, res, next){
        if (req.method === "OPTIONS"){
            next()
        }
    
        try {
            const token = getToken(req)
            if (!token){
                return res.status(403).json({message: "Користувач не авторизований"})
            }
            const {roles: userRoles} = jwt.verify(token, secret)
            let hasRole = false
            userRoles.forEach(role =>{
                if(roles.includes(role)){
                    hasRole = true
                }
            })
            if(!hasRole){
                return res.status(403).json({message: "У вас немає доступу"})
            }
            next() 
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "Користувач не авторизований"})
        }
    }
}