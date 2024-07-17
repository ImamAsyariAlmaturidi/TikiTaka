const Controller = require('../controllers/controller')
const express = require('express')
const router = express.Router()

router.get('/:id', Controller.renderProfileById)

module.exports = router