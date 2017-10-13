/**
 * Main application routes
 */

'use strict'

const config = require('../config')
const path = require('path')
const fs = require('fs')
const errors = require('./common/error')
const router = require('koa-router')()

module.exports = function (app) {
  router.use('/api/auth', require('./auth').routes(), require('./auth').allowedMethods())
  app.use(router.routes(), router.allowedMethods())

  if (config.backend.serverFrontend) {
    app.use((ctx, next) => {
      if (ctx.request.path.indexOf('api') === -1) {
        const data = fs.readFileSync(path.join(config.backend.frontend, '/index.html'))
        ctx.type = 'text/html; charset=utf-8'
        ctx.body = data
      }
    })
  }
}

