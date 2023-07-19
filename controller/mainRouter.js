const Router = require('express')
const router = new Router()
const authMiddleware = require('./../middlewaree/authMiddleware')
const controller = require('./mainController')
const Role = require('./../models/Role')
const roleMiddleware = require('./../middlewaree/roleMiddleware')



router.get('/', authMiddleware, controller.getMainPage)

router.delete('/delete', controller.deleteItem) 
router.put('/put', controller.saveItem) 
router.get('/downloadExcel', controller.exportItems)
router.post('/addItem', controller.addItems)

module.exports=router