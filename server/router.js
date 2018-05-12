var Router = require('koa-router')
var router = new Router()
const mongoose = require('mongoose')
const Image = mongoose.model('Image')

let perpage = 6

router.get('/api/list', async ctx => {
  console.log(req.request.path)
  let page = ctx.request.query.page || 0
  try {
    let imgLists = await Image.find({urlKey: { $exists: true }}, 'urlKey').skip(perpage * page).limit(perpage).sort('-_id')
    let count = await Image.count({urlKey: { $exists: true }})
    // console.log(imgLists, count)
    ctx.body = {
      code: 0,
      data: {
        imgs: imgLists,
        count,
        more: !!(count - perpage * (Number(page) + 1) > 0)
      }
    }
  } catch (err) {
    console.log(err)
    ctx.body = {
      code: 1,
      msg: '获取数据失败'
    }
  }
})

module.exports = router