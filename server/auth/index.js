'use strict'

const config = require('../../config').backend
const { sequelize } = require('../common/db')
const User = sequelize.import('../model/user.model.js')

// Passport Configuration
require('./local/passport').setup(User, config)

const router = require('koa-router')()

router.use('/login', require('./local').routes(), require('./local').allowedMethods())

module.exports = router
