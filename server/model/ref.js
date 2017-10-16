/**
* 模型关联类
*/
const { sequelize } = require('../common/db')
const User = sequelize.import('./user.model.js')
const Daily = sequelize.import('./daily.model.js')
const Item = sequelize.import('./item.model.js')
const Performance = sequelize.import('./performance.model.js')

// 建立模型之间关联关系
User.hasOne(Daily)
Daily.belongsTo(User)
Daily.hasOne(Item)
Item.belongsTo(Daily)
User.hasOne(Performance)
Performance.belongsTo(User)
//创建表
sequelize.sync({ force: true })