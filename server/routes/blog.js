const router = require('express').Router()
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const controller = require('../controllers/blog')
const uploader = require('../config/cloudinary.config')

router.get('/', controller.getBlogs)
router.post('/', [verifyAccessToken, isAdmin], controller.createNewBlog)
router.get('/one/:bid', controller.getBlog)
router.put('/likes/:bid', [verifyAccessToken], controller.likeBlog)
router.put('/image/:bid', [verifyAccessToken, isAdmin], uploader.single('images'), controller.uploadImagesBlog)
router.put('/dislike/:bid', [verifyAccessToken], controller.dislikeBlog)
router.put('/:bid', [verifyAccessToken, isAdmin], controller.updateBlog)
router.delete('/:bid', [verifyAccessToken, isAdmin], controller.deleteBlog)

module.exports = router