/**
 * get请求设置响应头不缓存中间件
 */

const cachedHandler = async (ctx, next) => {
  await next()
  // 设置所有get请求头不缓存
  if (ctx.method === 'GET') {
    ctx.set('Cache-Control', 'no-store')
  }
}

module.exports = cachedHandler
