const Controller = require('../controllers/controller')
const express = require('express')
const router = express.Router()

router.get('/login', Controller.userLogin)

module.exports = router