/**
 * Project config file includes dev/prod and frontend/backend
 */
var path = require('path')
var _ = require('lodash')


var backendBase = {
  // Root path of server
  root: path.normalize(__dirname),

  // Server port
  port: process.env.NODE_PORT || 10000,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: process.env.SECRET || 'bs-security-secret'
  },

  // List of user roles
  userRoles: ['admin', 'user'],

  // MongoDB connection options
  mysql: {
    options: {
      db: {
        safe: true
      }
    }
  },

  // picture temp dir
  picTempDir: process.env.TEMPPIC_DIR || path.resolve(__dirname, './client/static/temp'),
  // struct video upload dir
  videoDir: process.env.VIDEOUPLOAD_DIR || path.resolve(__dirname, './client/static/video'),
  // frontend folder
  frontend: path.resolve(__dirname, './client/dist'),
  // white list
  whiteList: ['/api/security/auth/local', '/'],
  // bstar server url
  serviceUrl: process.env.BSTARSERVICE_URI || 'http://192.168.8.204',
  // alarm websocket server url
  websockUrl: process.env.ALARMWS_URI || 'ws://127.0.0.1/api/ws/alarm',
  // send alarm to alarm machine
  sendAlarmUrl: process.env.ALARM_URI || 'http://127.0.0.1:5000'
}

var development = {
  frontend: {
    port: 9001,
    assetsRoot: path.resolve(__dirname, './client/src'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
    }
  },
  backend: _.merge({}, backendBase, {
    mysql: {
      database: 'test',
      user: 'root',
      pwd: '5566123',
      host: '192.168.20.31',
      port: 3306,
      dialect: 'mysql',
      pool: {
        min: 1,
        max: 10,
        idle: 10000
      }
    },
    // bstar server url
    serviceUrl: process.env.BSTARSERVICE_URI || 'http://192.168.8.204:80',
    // alarm websocket server url
    websockUrl: process.env.ALARMWS_URI || 'ws://192.168.8.113/api/ws/alarm',
    // send alarm to alarm machine
    sendAlarmUrl: process.env.ALARM_URI || 'http://192.168.8.113:5000'
  })
}
var production = {
  frontend: {
    port: 9001,
    index: path.resolve(__dirname, './client/dist/index.html'),
    assetsRoot: path.resolve(__dirname, './client/dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    cssSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    proxyTable: {
      '/api/socket.io': {
        target: 'http://localhost:' + backendBase.port,
        changeOrigin: true,
        ws: true
      },
      '/api': {
        target: 'http://localhost:' + backendBase.port,
        changeOrigin: true
      }
    }
  },
  backend: _.merge({}, backendBase, {
    // whether backend servers the frontend, you can use nginx to server frontend and proxy to backend services
    // if set to true, you need no web services like nginx
    serverFrontend: true,
    // Server IP
    ip: process.env.NODEAPP_HOST || '0.0.0.0',
    // Server port
    port: process.env.NODEAPP_PORT || 20000,
    // MongoDB connection options
    mongo: {
      uri: process.env.MONGODB_URI || process.env.MONGOHQ_URI ||
      'mongodb://localhost/bs-security'
    },
    // picture temp dir
    picTempDir: process.env.TEMPPIC_DIR || path.resolve(__dirname, '../../../../temp'),
    // struct video upload dir
    videoDir: process.env.VIDEOUPLOAD_DIR || path.resolve(__dirname, '../../html/static/video'),
    // frontend folder
    frontend: path.resolve(__dirname, './client/dist')
  })
}

var config = process.env.NODE_ENV === 'production' ? production : development

module.exports = _.assign({}, config)
