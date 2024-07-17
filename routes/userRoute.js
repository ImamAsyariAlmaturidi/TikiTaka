const Controller = require('../controllers/controller')
const express = require('express')
const router = express.Router()

router.get('/login', Controller.userLogin)
router.post('/login', Controller.handlerUserLogin)
router.post('/register', Controller.handlerUserRegister)
router.get('/register', Controller.userRegister)

module.exports = router