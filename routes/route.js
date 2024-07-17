const express = require('express')
const router = express.Router()
const postRouter = require('./postRoute')
const userRouter = require('./userRoute')
router.use('/landing', postRouter)
router.use('/users', userRouter)

module.exports = router