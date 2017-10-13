'use strict'
const Sequelize = require('sequelize')
const dbConfig = require('../../config').backend.mysql
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.pwd, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    pool: dbConfig.pool
})
// 测试数据库链接
sequelize.authenticate().then(function () {
    console.log('数据库连接成功')
}).catch(function (err) {
    // 数据库连接失败时打印输出
    console.error(err)
    throw err
})
exports.sequelize = sequelize
exports.Sequelize = Sequelize