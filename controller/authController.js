const User = require('./../models/User')
const Role = require('./../models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {secret} = require("../config/JWT.config")


const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController{
    async registration(req,res){
        try{
            // const errors = validationResult(req)
            const {username, password} = req.body
            console.log(req.body);
            const candidate = await User.findOne({username})
            if (candidate){
                return res.status(400).json({message: "Користувач з таким іменем вже існує"})
            }
            // if(!errors.isEmpty()){
            //     return res.status(400).json({message: "Помилка реєстрації", errors})
            // }
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username,password:hashPassword, roles:[userRole.value]})
            await user.save()
            

        }catch(e){
            console.log(e)
            res.status(400).json({message: 'Пароль має містити мінімум 6 символів, малу та велику літерацію та цифри'})
        }
    }
    async login(req,res){
        try{
            const {username, password} = req.body
            const user = await User.findOne({username})
            if(!user){
                return res.status(400).json({message: `Користувача ${username} не знайдено`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            console.log(validPassword)
            if(!validPassword){
                return res.status(400).json({message: "Введений пароль не вірний"})
            }
            const token = generateAccessToken(user._id, user.roles)
            res.cookie('role', user.roles, {httpOnly: true})
            return res.cookie('token', token, {httpOnly: true}).json({user})
            
        }catch(e){
            console.log(e)
            return res.status(400).json({message: 'Login error', error:e})
            // return res.render('errorModal', { message: 'Invalid credentials. Please try again.'});

        }
    }
    async logout(req, res, next){
        res.clearCookie('token')
        res.end()
        // res.redirect('')
        
    }
}

module.exports = new authController()