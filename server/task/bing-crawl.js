// 爬去 https://bing.ioliu.cn/ 图片地址，并且通过子进程返回
const request = require('request-promise-native')
const cheerio = require('cheerio')
const url = 'https://bing.ioliu.cn/'
const reg = /\_\d+x\d+\.jpg$/

// 延时函数
// const sleep = time => new Promise(resolve => {
//   setTimeout(resolve, time)
// })

;(async () => {
  console.log('Start visit the target page')

  let res
  try {
    res = await request(url)
  } catch (err) {
    console.log(err)
    process.exit(1) // 失败
    return
  }

  const $ = cheerio.load(res)

  let urls = Array.from($('.container .item .progressive__img')).map(item => item.attribs.src.replace(reg, '.jpg'))
  // console.log(result)
  let result = urls.map(item => {
    return {
      url: item,
      imageId: /(\d+)\.jpg$/.exec(item)[1]
    }
  })

  process.send({ result })
  process.exit(0)
})()