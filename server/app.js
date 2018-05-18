const Koa = require('koa')
const logger = require('koa-logger')
const { resolve } = require('path')
const serve = require('koa-static')
const views = require('koa-views')
const schedule = require('node-schedule');

// init db
require('./db')

const router = require('./router')

// // crawl task
// const crawl = require('./task/image')
// // qiniu task
// const qiniu = require('./task/qiniu')

// var j = schedule.scheduleJob('* 0 * * *', function(){
//   console.log('start tasks');
//   crawl()
//   setTimeout(qiniu,5000)
// });

const app = new Koa()

app
  .use(logger())
  .use(router.routes())
  .use(router.allowedMethods())

// static server
app.use(serve(resolve(__dirname, '../')))

app.use(views(resolve(__dirname, '../dist')), {
  extension: 'html'
})
app.use(async ctx => {
  await ctx.render('index.html')
})

app.listen(8080, function () {
  console.log('server listen at port 8080')
})