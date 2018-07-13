// 接受子进程返回的数据并存入数据库
const cp = require('child_process')
const { resolve } = require('path')
const mongoose = require('mongoose')
const Image = mongoose.model('Image')
const formatBody = require("./tietuku");

module.exports = async () => {
  const script = resolve(__dirname, 'bing-crawl.js')
  const child = cp.fork(script, [])
  // 标识是否执行过
  let invoked = false

  child.on('error', err => {
    if (invoked) return

    invoked = true
    console.log(err)
  })

  child.on('exit', code => {
    if (invoked) return

    invoked = true
    if (code !== 0) {
      new Error('exit code ' + code)
    }
  })

  child.on('message', data => {
    let result = data.result
    console.log("images log:",result)

    result.forEach(async item => {
      let image = await Image.findOne({
        imageId: item.imageId
      });
      formatBody(item.url)
      if (!image) {
        image = new Image(item);
        await image.save();
      }
    })
  })
}
