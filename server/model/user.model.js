const { sequelize } = require('../common/db')
const Sequelize = require('sequelize')
const User = function (sequelize, Sequelize) {
    return sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: '自增主键，也是用户表的索引'
        },
        username: {
            type: Sequelize.STRING(32),
            allowNull: false,
            // field: 'name',
            // defaultValue: 'ckb',
            comment: '用户名'
        },
        password: {
            type: Sequelize.STRING(64),
            allowNull: false,
            // field: 'pwd',
            comment: '密码'
        },
        num: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            comment: '数量'
        }
    }, {
            underscored: true, //额外字段以下划线来分割
            timestamps: true, //取消默认生成的createdAt、updatedAt字段
            // freezeTableName: true, // Model 对应的表名将与model名相同
            createdAt: "created_at",
            updatedAt: "updated_at",
            //静态方法，即user模型自带的方法
            // classMethods: classMethods,
            comment: "用户信息"
            // indexes: [{
            //     name: "loginInfo_userId",
            //     method: "BTREE",
            //     fields: ["user_id"]
            // }]
        })
}
module.exports = User