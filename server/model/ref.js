/**
* 模型关联类
*/
const { sequelize } = require('../common/db')
const User = sequelize.import('./user.model.js')
const Daily = sequelize.import('./daily.model.js')
const Item = sequelize.import('./item.model.js')

// 建立模型之间关联关系
User.hasOne(Daily)
Daily.belongsTo(User)
Daily.hasOne(Item)
Item.belongsTo(Daily)

//创建表
sequelize.sync({ force: true })