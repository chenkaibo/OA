const { sequelize } = require('../common/db')
const Sequelize = require('sequelize')
const Daily = function (sequelize, Sequelize) {
    return sequelize.define('daily', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: '日报表id,主键'
        },
        title: {
            type: Sequelize.STRING(1234),
            allowNull: false,
            comment: '标题'
        },
        task: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: '任务id字符串'
        },
        plan: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: '计划id字符串'
        }
        // user_id: {
        //     type: Sequelize.STRING,
        //     references: {
        //         model: 'user',
        //         key: '_id'
        //     }
        // }
    }, {
            underscored: true, //额外字段以下划线来分割
            timestamps: true, //取消默认生成的createdAt、updatedAt字段
            // freezeTableName: true, // Model 对应的表名将与model名相同
            createdAt: "created_at",
            updatedAt: "updated_at",
            //静态方法，即user模型自带的方法
            // classMethods: classMethods,
            comment: "日报信息",
            charset: 'utf8'
        })
}
module.exports = Daily