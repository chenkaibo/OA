const { sequelize, Sequelize } = require('../common/db')
const Performance = function (sequelize, Sequelize) {
    return sequelize.define('performance', {
        id: {
            type: Sequelize.INTEGER(11),
            allowNull: true,
            primaryKey: true,
            autoIncrement: true,
            comment: '自增主键，也是用户表的索引'
        },
        task: {
            type: Sequelize.FLOAT,
            allowNull: true,
            comment: '任务'
        },
        daily: {
            type: Sequelize.FLOAT,
            allowNull: true,
            comment: '日报'
        },
        attitude: {
            type: Sequelize.FLOAT,
            allowNull: true,
            comment: '态度'
        },
        award: {
            type: Sequelize.FLOAT,
            allowNull: true,
            comment: '加分'
        },
        subject: {
            type: Sequelize.FLOAT,
            allowNull: true,
            comment: '主观分'
        },
        total: {
            type: Sequelize.FLOAT,
            allowNull: true,
            comment: '总分'
        }
    }, {
            underscored: true, // 额外字段以下划线来分割
            timestamps: true, // 取消默认生成的createdAt、updatedAt字段
            freezeTableName: true, // Model 对应的表名将与model名相同
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            // 静态方法，即user模型自带的方法
            // classMethods: classMethods,
            comment: '绩效信息',
            charset: 'utf8'
            // indexes: [{
            //     name: 'id',
            //     method: 'BTREE',
            //     fields: ['id']
            // }]
        })
}
module.exports = Performance
