/**
 * 定时任务配置表
 */

'use strict'
const sched = require('../common/schedule')

module.exports = function () {
  // 车辆统计 每个小时统计一次数据
  const statistic = require('../api/vehicle/statistic/statistics.controller').index
  const syncDevOnlineList = require('../api/sys/device/device.controller').syncOnlineList
  const syncAttentionStatus = require('../api/face/attention/attention.controller').syncAttentionStatus
  const ChangState = require('../api/sys/setting/setting.controller').changState // 车辆布控修改状态
  const updateFileConnectTime = require('../api/sys/setting/setting.controller').updateFileConnectTime // 创建分表
  sched.addSchedule({ rule: '0 0 * * * *', operation: statistic })
  sched.addSchedule({ rule: '*/30 * * * * *', operation: syncDevOnlineList })    // 每隔30s同步一次设备状态
  sched.addSchedule({ rule: '0 0 0 * * *', operation: syncAttentionStatus })
  sched.addSchedule({ rule: '0 0 0 * * *', operation: ChangState })// 车辆布控修改状态
  sched.addSchedule({ rule: require('../../config').backend.createFileConnectTime, operation: updateFileConnectTime })
}
