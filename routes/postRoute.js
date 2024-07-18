const Controller = require('../controllers/controller')
const express = require('express')
const router = express.Router()

router.get('/:id', Controller.landingPageRender)

module.exports = router