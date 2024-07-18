const Controller = require('../controllers/controller')
const express = require('express')
const router = express.Router()
const upload = require('../utils/multer')
const { requireLogin } = require('../middlewares/sessionAuth');
const uploadMiddleware = upload.single("gambar");


router.get('/:id', requireLogin, Controller.renderProfileById)
router.get('/setting/:id', requireLogin, Controller.renderSettingById)
router.post('/privacy/:id/update', requireLogin, Controller.handlerSettingPrivacyById)
router.post('/setting/:id/update', requireLogin, uploadMiddleware, Controller.handlerSettingById)
router.get('/privacy/:id', requireLogin, Controller.renderSettingPrivacyById)
router.post('/add/post/:id', requireLogin, uploadMiddleware ,Controller.handlerAddPost)


module.exports = router