'use strict'

const { sequelize } = require('../../common/db')
const User = sequelize.import('../../model/user.model.js')

exports.getAll = async (ctx) => {
    try {
        const users = await User.findAll()
    } catch (error) {

    }
}