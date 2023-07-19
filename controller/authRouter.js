const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require("express-validator")

router.get('/',  (req, res) => {
    res.render("login")
})

router.get('/registration',  (req, res) => {
    res.render("registration")
})

router.post('/registration', [
    check('username', "Імя користувача не може бути порожнім").notEmpty(),
    check('password')
    .notEmpty().withMessage('Пароль є обов\'язковим')
    .isLength({ min: 6 }).withMessage('Мінімальна кількість символів - 6')
    .matches(/[a-z]/).withMessage('Пароль повинен містити малі літери')
    .matches(/[A-Z]/).withMessage('Пароль повинен містити великі літери')
    .matches(/[0-9]/).withMessage('Пароль повинен містити цифри')
],controller.registration)
router.post('/login', controller.login)
router.post('/logout', controller.logout)

router.get('/login',  (req, res) => {
    res.render("login")
})
module.exports=router