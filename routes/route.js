const express = require('express')
const router = express.Router()
const postRouter = require('./postRoute')

router.use('/landing', postRouter)

module.exports = router