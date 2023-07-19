const router = require('./authRouter')
const controller = require('./usersController')
const roleMiddleware = require('./../middlewaree/roleMiddleware')
const authMiddleware = require('./../middlewaree/authMiddleware')


router.get('/main/users', roleMiddleware(['ADMIN']), controller.getUsers)

router.delete('/delete', controller.deleteUser) 
router.put('/put', controller.changeRole)

module.exports = router