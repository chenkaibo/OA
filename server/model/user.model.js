const { sequelize, Sequelize } = require('../common/db')
const User = function (sequelize, Sequelize) {
    return sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER(11),
            allowNull: true,
            primaryKey: true,
            autoIncrement: true,
            comment: '自增主键，也是用户表的索引'
        },
        username: {
            type: Sequelize.STRING(32),
            allowNull: true,
            comment: '用户名'
        },
        password: {
            type: Sequelize.STRING(64),
            allowNull: true,
            // field: 'pwd',
            comment: '密码'
        },
        role: {
            type: Sequelize.INTEGER(11),
            allowNull: true,
            comment: '用户角色'
        },
        telphone: {
            type: Sequelize.STRING(32),
            allowNull: true,
            validate: {
                is: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
            },
            comment: '手机号码'
        },
        birthday: {
            type: Sequelize.DATE,
            comment: '出生日期'
        },
        age: {
            type: Sequelize.INTEGER(11),
            validate: {
                isInt: true,
                min: 0,
                max: 200
            }
        },
        email: {
            type: Sequelize.STRING(64),
            comment: '邮箱'
        },
        school: {
            type: Sequelize.STRING(64),
            comment: '毕业院校'
        },
        graduate_date: {
            type: Sequelize.DATE,
            comment: '毕业时间'
        },
        super_id: {
            type: Sequelize.INTEGER(11),
            allowNull: true,
            comment: '上级id'
        },
        picture: {
            type: Sequelize.BLOB,
            comment: '用户图像'
        },
        position: {
            type: Sequelize.STRING(32),
            allowNull: true,
            comment: '上级id'
        }
    }, {
            underscored: true, // 额外字段以下划线来分割
            timestamps: true, // 取消默认生成的createdAt、updatedAt字段
            freezeTableName: true, // Model 对应的表名将与model名相同
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            // 静态方法，即user模型自带的方法
            // classMethods: classMethods,
            comment: '用户信息',
            charset: 'utf8'
            // indexes: [{
            //     name: 'id',
            //     method: 'BTREE',
            //     fields: ['id']
            // }]
        })
}
module.exports = User