/**
 * 定时任务
 */

'use strict'
const schedule = require('node-schedule')
const randomString = require('randomstring')
const _ = require('lodash')
const scheduleList = []
exports.addSchedule = function (plans) {
  const ids = []
  if (_.isArray(plans)) {
    for (const item of plans) {
      const id = randomString.generate()
      scheduleList.push({
        id,
        handle: schedule.scheduleJob(item.rule, item.operation)
      })
      ids.push(id)
    }
    return ids
  } else if (_.isObject(plans)) {
    const id = randomString.generate()
    scheduleList.push({
      id,
      handle: schedule.scheduleJob(plans.rule, plans.operation)
    })
    return id
  } else {
    return false
  }
}
exports.cancleSchedule = function (id) {
  if (_.isString(id)) {
    return scheduleList.some((item) => {
      if (item.id === id) {
        item.handle.cancle()
        return true
      }
    })
  }
}
