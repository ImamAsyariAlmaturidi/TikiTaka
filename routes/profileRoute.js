const Controller = require('../controllers/controller')
const express = require('express')
const router = express.Router()
const upload = require('../utils/multer')
const uploadMiddleware = upload.single("gambar");

router.get('/:id', Controller.renderProfileById)
router.get('/setting/:id', Controller.renderSettingById)
router.post('/privacy/:id/update', Controller.handlerSettingPrivacyById)
router.post('/setting/:id/update', uploadMiddleware, Controller.handlerSettingById)
router.get('/privacy/:id', Controller.renderSettingPrivacyById)
router.post('/add/post/:id', uploadMiddleware ,Controller.handlerAddPost)


module.exports = router