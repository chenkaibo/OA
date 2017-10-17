'use strict'

const { sequelize } = require('../../common/db')
const User = sequelize.import('../../model/user.model.js')
const Daily = sequelize.import('../../model/daily.model.js')

exports.getAll = async (ctx) => {
  try {
    const users = await User.findAndCount()
    ctx.status = 200
    ctx.body = users
  } catch (error) {
    ctx.throw(error)
  }
}
exports.getOne = async (ctx) => {
  try {
    const user = await User.findById(ctx.params.id)
    ctx.status = 200
    ctx.body = user.values
  } catch (error) {
    ctx.throw(error)
  }
}
exports.add = async (ctx) => {
  try {
    await User.create(ctx.request.body)
    ctx.status = 201
  } catch (error) {
    ctx.throw(error)
  }
}
exports.update = async (ctx) => {
  try {
    await User.update(ctx.request.body, {
      where: {
        id: ctx.params.id
      }
    })
    ctx.status = 200
  } catch (error) {
    ctx.throw(error)
  }
}
exports.delete = async (ctx) => {
  try {
    await User.destroy({
      where: {
        id: ctx.params.id
      }
    })
    ctx.status = 200
  } catch (error) {
    ctx.throw(error)
  }
}
