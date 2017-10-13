const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const path = require('path')
const onerror = require('koa-onerror')
const compress = require('koa-compress')
const passport = require('koa-passport')
const config = require('../config')
const render = require('koa-ejs')
const filelog = require('./middlewares/response.log')
const serve = require('koa-static')
const cors = require('kcors')
const convert = require('koa-convert')

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'production' || 'development'

// require('./common/load.model')
// require('./config/seed')
// err handler
onerror(app)
render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: true
})
// third service
app.use(serve(path.join(__dirname, '../client/dist')))
app.use(compress())

// logger
app.use(filelog)
// middlewares
// app.use(bodyparser())
app.use(bodyParser({ jsonLimit: '10mb', formLimit: '10mb', extendTypes: { json: ['application/x-www-form-urlencoded'] } }))
app.use(json())
app.use(logger())
app.use(passport.initialize())
app.use(convert(cors())) // cors

// mergeArgs
app.use(require('./middlewares/args.merge'))
// set cached header no-cached
app.use(require('./middlewares/noCache'))
// app.use(require('./middlewares/err.handler'))

require('./routes')(app)

module.exports = app
