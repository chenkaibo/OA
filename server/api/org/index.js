'use strict'
const router = require('koa-router')()
const controller = require('./org.controller')

router.post('/', controller.add)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router
