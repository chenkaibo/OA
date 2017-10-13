var bcrypt = require('bcryptjs')
var moment = require('moment')
var crypto = require('crypto')
var SALT_WORK_FACTOR = 10
const fs = require('fs')
const path = require('path')
const _ = require('lodash')

// const _ = require('lodash')

moment.locale('zh-cn') // 使用中文

// 格式化时间
exports.formatDate = (date, friendly) => {
  date = moment(date)
  if (friendly) {
    return date.fromNow()
  } else {
    return date.format('YYYY-MM-DD HH:mm')
  }
}

exports.validateId = str => {
  return (/^[a-zA-Z0-9\-_]+$/i).test(str)
}

// bcrypt.js hash加密
exports.bhash = async str => {
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
  const hash = await bcrypt.hash(str, salt)
  return hash
}

// bcrypt.js加密校验
exports.bcompare = async (str, hash) => {
  return await bcrypt.compare(str, hash)
}

/**
 * 树形结构转换
 * @param a
 * @param idStr
 * @param pidStr
 * @returns {Array}
 */
exports.transData2Tree = (a, idStr, pidStr) => {
  var r = []
  var hash = {}
  var len = a.length
  for (var i = 0; i < len; i++) {
    hash[a[i][idStr]] = a[i]
  }
  for (var j = 0; j < len; j++) {
    var aVal = a[j]
    var hashVP = hash[aVal[pidStr]]
    if (hashVP) {
      (!hashVP.children) && (hashVP.children = [])
      hashVP.children.push(aVal)
    } else {
      r.push(aVal)
    }
  }
  return r
}

/**
 * 返回一个节点下的所有子孙节点
 */
const getChildren = (arr, result, pid) => {
  for (var i in result) {
    if (result[i].pid && (result[i].pid + '' === pid + '')) {
      arr.push(result[i]._id + '')
      getChildren(arr, result, result[i]._id)
    }
  }
  return arr
}

exports.getChildren = getChildren

/**
 * 树形结构转化（新） 支持指定根节点开始
 * @param {*} result // 数据结果集
 * @param {*} idStr // id标识
 * @param {*} pidStr // pid标识
 * @param {*} pidVal // 指定顶级目录Pid值（选填，默认查询所有结构树）
 */
const transData2TreeNew = (result, idStr, pidStr, pidVal) => {
  pidVal = pidVal || result[idStr]
  var rtn = []
  for (var i in result) {
    if (result[i][pidStr] === pidVal) {
      const childrenData = transData2TreeNew(result, idStr, pidStr, result[i][idStr])
      if (childrenData.length > 0) result[i].children = childrenData
      // result[i].children = transData2TreeNew(result, idStr, pidStr, result[i][idStr]) // 前端要求去掉children为空的情况
      rtn.push(result[i])
    }
  }
  return rtn
}
exports.transData2TreeNew = transData2TreeNew

/**
 * 根据组织结构数据/通道数据  组织树形结构
 * @param {*} result // 组织结构数据
 * @param {*} idStr // id标识
 * @param {*} pidStr // pid标识
 * @param {*} resouces // 通道资源数据
 * @param {*} pidVal // 指定顶级目录Pid值（选填，默认查询所有结构树）
 * @param {*} tempObj //临时对象（递归使用，不填）
 * @param {*} index  //临时数字（递归使用，不填）
 */

const transData2TreeNewWithResouce = (result, idStr, pidStr, resouces, pidVal, tempObj, index = 0) => {
  pidVal = pidVal || result[idStr]
  tempObj = tempObj || {}
  if (index === 0) {
    for (var j = 0; j < resouces.length; j++) {
      const tempRid = resouces[j]['oid']
      if (tempObj[tempRid]) {
        tempObj[tempRid].push(resouces[j])
      } else {
        tempObj[tempRid] = [resouces[j]]
      }
    }
  }
  var rtn = []
  for (var i in result) {
    index++
    if (result[i][pidStr] === pidVal) {
      const resourcesArr = tempObj[result[i][idStr]]
      if (resourcesArr) {
        result[i].children = tempObj[result[i][idStr]].concat(transData2TreeNewWithResouce(result, idStr, pidStr, resouces, result[i][idStr], tempObj, index))
      } else {
        result[i].children = transData2TreeNewWithResouce(result, idStr, pidStr, resouces, result[i][idStr], tempObj, index)
      }
      rtn.push(result[i])
    }
  }
  return rtn
}
exports.transData2TreeNewWithResouce = transData2TreeNewWithResouce

exports.md5 = function (str) {
  var md5sum = crypto.createHash('md5')
  md5sum.update(str)
  str = md5sum.digest('hex')
  return str
}
// create folders
function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}
exports.mkdirsSync = mkdirsSync

exports.handleSysException = (err, code, message) => {
  if (err.code) {
    throw err
  }
  console.log(err)
  const error = new Error(message || '系统内部错误')
  error.code = code || 500
  throw error
}

// 筛选数据交集(相同数据结构)
exports.filterData = (arr1, arr2) => {
  var resArr = []
  arr1.forEach(item1 => {
    const temp = arr2.filter(item2 => item1 === item2)
    if (!_.isEmpty(temp)) resArr.push(temp[0])
  })
  return resArr
}
/** 筛选数据交集(不同数据结构，通过id筛选)
 *  consArr(条件id集合)
 *  origin(目标数据集合)
 */
exports.filterDataById = (conArr, origin) => {
  var resArr = []
  conArr.forEach(item1 => {
    const temp = origin.filter(item2 => (item1 + '') === (item2._id + ''))
    if (!_.isEmpty(temp)) resArr.push(temp[0])
  })
  return resArr
}
/** 筛选数据交集(不同数据结构，通过id筛选)
 *  consArr(条件id集合)
 *  origin(目标数据集合)
 *  conStr(条件字符串)
 */
exports.filterDataByCon = (conArr, origin, conStr) => {
  var resArr = []
  conArr.forEach(item1 => {
    const temp = origin.filter(item2 => (item1 + '') === (item2[conStr] + ''))
    if (!_.isEmpty(temp)) resArr.push(temp[0])
  })
  return resArr
}
