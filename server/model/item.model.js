// const { sequelize } = require('../common/db')
// const Sequelize = require('sequelize')
const Item = function (sequelize, Sequelize) {
  return sequelize.define('item', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
      comment: '任务id,主键'
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: '标题'
    }
    // daily_id: {
    //     type: Sequelize.STRING,
    //     references: {
    //         model: 'daily',
    //         key: '_id'
    //     }
    // }
  }, {
      underscored: true, // 额外字段以下划线来分割
      timestamps: true, // 取消默认生成的createdAt、updatedAt字段
      freezeTableName: true, // Model 对应的表名将与model名相同
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      // 静态方法，即user模型自带的方法
      // classMethods: classMethods,
      comment: '条目信息',
      charset: 'utf8'
      // indexes: [{
      //     name: 'id',
      //     method: 'BTREE',
      //     fields: ['id']
      // }]
    })
}
module.exports = Item
