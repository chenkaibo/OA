/**
 * 日志输出中间件
 */
const logUtil = require('../common/log.util')

const responseLog = async (ctx, next) => {
  // 响应开始时间
  const start = new Date()
  // 响应间隔时间
  let ms
  try {
    // 开始进入到下一个中间件
    await next()
    // 设置所有get请求头不缓存
    if (ctx.method === 'GET') {
      ctx.set('Cache-Control', 'no-cache')
    }
    ms = new Date() - start
    // 记录响应日志
    logUtil.logResponse(ctx, ms)
  } catch (error) {
    ms = new Date() - start
    // 记录异常日志
    logUtil.logError(ctx, error, ms)
    ctx.status = error.status || 500
    ctx.body = {
      code: error.code,
      message: error.message
    }
  }
}

module.exports = responseLog

