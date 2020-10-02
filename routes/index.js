const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const generated = require('./modules/generated')
router.use('/', home)
router.use('/shorten', generated)

module.exports = router
