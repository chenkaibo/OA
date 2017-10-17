'use strict'

const { sequelize } = require('../../common/db')
const Performance = sequelize.import('../../model/performance.model.js')

exports.getAll = async (ctx) => {
  try {
    const performances = await Performance.findAll()
    ctx.status = 200
    ctx.body = performances.values
  } catch (error) {
    ctx.throw(error)
  }
}
exports.getOne = async (ctx) => {
  try {
    const performance = await Performance.findById(ctx.params.id)
    ctx.status = 200
    ctx.body = performance.values
  } catch (error) {
    ctx.throw(error)
  }
}
exports.add = async (ctx) => {
  try {
    await Performance.create(ctx.request.body)
    ctx.status = 201
  } catch (error) {
    ctx.throw(error)
  }
}
exports.update = async (ctx) => {
  try {
    await Performance.update(ctx.request.body, {
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
    await Performance.destroy({
      where: {
        id: ctx.params.id
      }
    })
    ctx.status = 200
  } catch (error) {
    ctx.throw(error)
  }
}
