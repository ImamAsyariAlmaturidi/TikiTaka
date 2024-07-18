const Controller = require('../controllers/controller')
const express = require('express')
const router = express.Router()
const { requireLogin } = require('../middlewares/sessionAuth');
router.get('/:id', requireLogin, Controller.landingPageRender)

module.exports = router