const express = require('express')
const router = express.Router()
const postRouter = require('./postRoute')
const userRouter = require('./userRoute')
const profileRouter = require('./profileRoute')
router.use('/landing', postRouter)
router.use('/users', userRouter)
router.use('/profile', profileRouter)

module.exports = router