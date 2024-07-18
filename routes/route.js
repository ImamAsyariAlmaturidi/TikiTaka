const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const postRouter = require('./postRoute')
const userRouter = require('./userRoute')
const profileRouter = require('./profileRoute')
const { requireLogin } = require('../middlewares/sessionAuth');
router.use('/landing', postRouter)
router.use('/users', userRouter)
router.use('/profile', profileRouter)
router.get('/dashboard', requireLogin, Controller.renderDashboard)
module.exports = router