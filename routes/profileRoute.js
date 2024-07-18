const Controller = require('../controllers/controller')
const express = require('express')
const router = express.Router()

router.get('/:id', Controller.renderProfileById)
router.get('/setting/:id', Controller.renderSettingById)
router.post('/privacy/:id/update', Controller.handlerSettingPrivacyById)
router.post('/setting/:id/update', Controller.handlerSettingById)
router.get('/privacy/:id', Controller.renderSettingPrivacyById)


module.exports = router