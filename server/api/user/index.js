'use strict'
const router = require('koa-router')()
const controller = require('./user.controller')

router.get('/', controller.getAll)
router.get('/:id', controller.getOne)
router.post('/', controller.add)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router
