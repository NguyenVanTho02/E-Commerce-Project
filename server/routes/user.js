const router = require('express').Router()
const controller = require('../controllers/user')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')


router.post('/register', controller.register)
router.get('/finalregister/:token', controller.finalRegister)
router.post('/login', controller.login)
// Thực hiện theo tuần tự từ trái qua phải, ( sử dụng để xử lý middleware )
router.get('/current', verifyAccessToken, controller.getCurrent)
router.post('/refreshtoken', controller.refreshAccessToken)
router.get('/logout', controller.logout)
router.post('/forgotpassword', controller.forgotPassword)
router.put('/resetpassword', controller.resetPassword)
router.get('/', [verifyAccessToken, isAdmin], controller.getUsers)
router.delete('/', [verifyAccessToken, isAdmin], controller.deleteUser)
router.put('/current', [verifyAccessToken], controller.updateUser)
router.put('/address', [verifyAccessToken], controller.updateUserAddress)
router.put('/cart', [verifyAccessToken], controller.updateCart)
router.put('/:uid', [verifyAccessToken, isAdmin], controller.updateUserByAdmin)



module.exports = router

// CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETE
// CREATE (POST) + PUT - body
// GET + DELETE - query
