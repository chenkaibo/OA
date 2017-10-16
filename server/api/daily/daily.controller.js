'use strict'

const { sequelize } = require('../../common/db')
const Daily = sequelize.import('../../model/daily.model.js')

exports.getAll = async (ctx) => {
    try {
        const dailies = await Daily.findAll()
        ctx.status = 200
        ctx.body = dailies.values
    } catch (error) {
        ctx.throw(error)
    }
}
exports.getOne = async (ctx) => {
    try {
        const daily = await Daily.findById(ctx.params.id)
        ctx.status = 200
        ctx.body = daily.values
    } catch (error) {
        ctx.throw(error)
    }
}
exports.add = async (ctx) => {
    try {
        await Daily.create(ctx.request.body)
        ctx.status = 201
    } catch (error) {
        ctx.throw(error)
    }
}
exports.update = async (ctx) => {
    try {
        await Daily.update(ctx.request.body, {
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
        await Daily.destroy({
            where: {
                id: ctx.params.id
            }
        })
        ctx.status = 200
    } catch (error) {
        ctx.throw(error)
    }
}