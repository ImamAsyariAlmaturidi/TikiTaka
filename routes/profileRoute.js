const Controller = require('../controllers/controller')
const express = require('express')
const router = express.Router()

router.get('/:id', Controller.renderProfileById)
router.get('/setting/:id', Controller.renderSettingById)


module.exports = router