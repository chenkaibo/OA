/**
 * Populate DB with admin user data on server start
 */

'use strict'

const mongoose = require('mongoose')
const User = mongoose.model('User')
const Org = mongoose.model('Org')
const Sysparamters = mongoose.model('Sysparamters')
const Dict = mongoose.model('Dict')
const PlanTemplate = mongoose.model('PlanTemplate')
const FaceAlgorithm = mongoose.model('FaceAlgorithm')
const tools = require('../common/tools')

// const _ = require('lodash')

// search for admin user, if no, create one
User.find({ role: 'admin' }, function (err, admin) {
  if (err) throw err
  if (!(admin && admin.length)) {
    User.create({
      provider: 'local',
      role: 'admin',
      username: 'Admin',
      name: 'admin',
      pwd: tools.md5('admin')
    }, function () {
      console.log('finished populating users')
    })
  }
})

Org.find({ type: 0, isroot: true }, function (err, org) {
  if (err) throw err
  if (!org.length) {
    Org.bulkWrite([
      {
        insertOne: {
          document: {
            name: '根节点-现场',
            type: 0,
            order: 0,
            isroot: true
          }
        }
      }
    ], function () {
      console.log('finished populating org(0)')
    })
  }
})

Org.find({ type: 1, isroot: true }, function (err, org) {
  if (err) throw err
  if (!org.length) {
    Org.bulkWrite([
      {
        insertOne: {
          document: {
            name: '根节点-车辆',
            type: 1,
            order: 0,
            isroot: true
          }
        }
      }
    ], function () {
      console.log('finished populating org(1)')
    })
  }
})

Org.find({ type: 2, isroot: true }, function (err, org) {
  if (err) throw err
  if (!org.length) {
    Org.bulkWrite([
      {
        insertOne: {
          document: {
            name: '根节点-人脸',
            type: 2,
            order: 0,
            isroot: true
          }
        }
      }
    ], function () {
      console.log('finished populating org(2)')
    })
  }
})

Sysparamters.find({}, function (err, sys) {
  if (err) throw err
  if (!sys.length) {
    Sysparamters.create({
      name: '园区综合性管理平台',
      titlecolor: '#171717',
      titlefont: '{\"font\":\"微软雅黑\",\"size\":\"16\",\"fontColor\":\"#FFFFFF\",\"fontItalic\":\"normal\",\"fontRegular\":\"normal\"}',
      alarmlog: 120,
      equipmentlog: 120,
      operationlog: 120,
      configlog: 120,
      transport: 'TCP',
      picture: 'auto',
      screenshot: 'JPG',
      videotape: 'AVI',
      creatdbtime: Math.floor(new Date() / 1000)
    }, function () {
      console.log('finished init Sysparamters')
    })
  }
})

const dictDatas = [
  {
    code: '4',
    name: '小汽车',
    type: 'vehicle'
  },
  {
    code: '5',
    name: '三轮车',
    type: 'vehicle'
  },
  {
    code: '6',
    name: '巴士车',
    type: 'vehicle'
  },
  {
    code: '7',
    name: '面包车',
    type: 'vehicle'
  },
  {
    code: '8',
    name: '卡车',
    type: 'vehicle'
  },
  {
    code: '1',
    name: '布控车辆',
    type: 'vehicleListType'
  },
  {
    code: '1',
    name: '精准布控',
    type: 'defenseType'
  },
  {
    code: '2',
    name: '黑名单布控',
    type: 'defenseType'
  },
  {
    code: '0',
    name: '陌生车辆',
    type: 'vehicleListType'
  },
  {
    code: '2',
    name: '白名单',
    type: 'vehicleListType'
  },
  {
    code: '3',
    name: '黑名单',
    type: 'vehicleListType'
  },
  {
    code: '4',
    name: '正常车辆',
    type: 'vehicleListType'
  },
  {
    code: '3',
    name: '白名单布控',
    type: 'defenseType'
  },
  {
    type: 'alarmType',
    code: '1',
    name: '车辆布控'
  },
  {
    type: 'alarmType',
    code: '2',
    name: '人员布控'
  },
  {
    type: 'alarmType',
    name: '黑名单',
    code: '3'
  },
  {
    type: 'vehicleColor',
    code: '1',
    name: '黑色'
  },
  {
    type: 'vehicleColor',
    code: '2',
    name: '蓝色'
  },
  {
    type: 'vehicleColor',
    code: '4',
    name: '绿色'
  },
  {
    type: 'vehicleColor',
    code: '5',
    name: '灰色'
  },
  {
    type: 'vehicleColor',
    code: '6',
    name: '白色'
  },
  {
    type: 'vehicleColor',
    code: '7',
    name: '红色'
  },
  {
    type: 'vehicleColor',
    code: '8',
    name: '黄色'
  },
  {
    type: 'vehicleColor',
    code: '9',
    name: '粉色'
  },
  {
    type: 'vehicleColor',
    code: '10',
    name: '紫色'
  },
  {
    type: 'vehicleColor',
    code: '11',
    name: '青色'
  },
  {
    type: 'vehicleColor',
    code: '12',
    name: '深灰色'
  },
  {
    type: 'vehicleColor',
    code: '13',
    name: '金色'
  }
]

Dict.find({}, function (err, sys) {
  if (err) throw err
  if (!sys.length) {
    Dict.create(dictDatas, function () {
      console.log('finished init Dict')
    })
  }
})
// 初始化计划模板
PlanTemplate.find({}, function (err, result) {
  if (err) throw err
  if (!result.length) {
    PlanTemplate.insertMany([{
      'name': '全天',
      'elements': [
        {
          'week': 1,
          'timeList': [
            {
              'beginTime': 0,
              'endTime': 86400
            }
          ]
        },
        {
          'week': 2,
          'timeList': [
            {
              'beginTime': 0,
              'endTime': 86400
            }
          ]
        },
        {
          'week': 3,
          'timeList': [
            {
              'beginTime': 0,
              'endTime': 86400
            }
          ]
        },
        {
          'week': 4,
          'timeList': [
            {
              'beginTime': 0,
              'endTime': 86400
            }
          ]
        },
        {
          'week': 5,
          'timeList': [
            {
              'beginTime': 0,
              'endTime': 86400
            }
          ]
        },
        {
          'week': 6,
          'timeList': [
            {
              'beginTime': 0,
              'endTime': 86400
            }
          ]
        },
        {
          'week': 7,
          'timeList': [
            {
              'beginTime': 0,
              'endTime': 86400
            }
          ]
        },
        {
          'week': 8,
          'timeList': [
            {
              'beginTime': 0,
              'endTime': 86400
            }
          ]
        }
      ]
    }, {
      'name': '工作时间',
      'elements': [
        {
          'week': 1,
          'timeList': [
            {
              endTime: 72000,
              beginTime: 28800
            }
          ]
        },
        {
          'week': 2,
          'timeList': [
            {
              endTime: 72000,
              beginTime: 28800
            }
          ]
        },
        {
          'week': 3,
          'timeList': [
            {
              endTime: 72000,
              beginTime: 28800
            }
          ]
        },
        {
          'week': 4,
          'timeList': [
            {
              endTime: 72000,
              beginTime: 28800
            }
          ]
        },
        {
          'week': 5,
          'timeList': [
            {
              endTime: 72000,
              beginTime: 28800
            }
          ]
        },
        {
          'week': 6,
          'timeList': []
        },
        {
          'week': 7,
          'timeList': []
        },
        {
          'week': 8,
          'timeList': []
        }
      ]
    }, {
      'name': '工作日24小时',
      'elements': [
        {
          'week': 1,
          'timeList': [
            {
              'beginTime': 0,
              'endTime': 86400
            }
          ]
        },
        {
          'week': 2,
          'timeList': [
            {
              'beginTime': 0,
              'endTime': 86400
            }
          ]
        },
        {
          'week': 3,
          'timeList': [
            {
              'beginTime': 0,
              'endTime': 86400
            }
          ]
        },
        {
          'week': 4,
          'timeList': [
            {
              'beginTime': 0,
              'endTime': 86400
            }
          ]
        },
        {
          'week': 5,
          'timeList': [
            {
              'beginTime': 0,
              'endTime': 86400
            }
          ]
        },
        {
          'week': 6,
          'timeList': []
        },
        {
          'week': 7,
          'timeList': []
        },
        {
          'week': 8,
          'timeList': []
        }
      ]
    }, {
      'name': '节假日',
      'elements': [
        {
          'week': 1,
          'timeList': []
        },
        {
          'week': 2,
          'timeList': []
        },
        {
          'week': 3,
          'timeList': []
        },
        {
          'week': 4,
          'timeList': []
        },
        {
          'week': 5,
          'timeList': []
        },
        {
          'week': 6,
          'timeList': [
            {
              'beginTime': 0,
              'endTime': 86400
            }
          ]
        },
        {
          'week': 7,
          'timeList': [
            {
              'beginTime': 0,
              'endTime': 86400
            }
          ]
        },
        {
          'week': 8,
          'timeList': [
            {
              'beginTime': 0,
              'endTime': 86400
            }
          ]
        }
      ]
    }])
  }
})
FaceAlgorithm.find({}, function (err, result) {
  if (err) throw err
  if (!result.length) {
    FaceAlgorithm.insertMany([{
      loginApi: {
        url: '/auth/login',
        method: 'POST',
        headers: {
          'User-Agent': 'Koala Admin'
        }
      },
      createUserApi: {
        url: '/subject',
        method: 'POST'
      },
      updateUserApi: {
        url: '/subject/:id',
        method: 'PUT'
      },
      deleteUserApi: {
        url: '/subject/:id',
        method: 'DELETE'
      },
      historyApi: {
        url: '/event/events',
        method: 'GET'
      },
      uploadApi: {
        url: '/subject/photo',
        method: 'POST'
      },
      timeout: 1000,
      type: 'BSR-KS'
    }])
  }
})

