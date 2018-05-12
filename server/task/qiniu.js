const request = require('request-promise-native')
const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config')
const mongoose = require('mongoose')
const Image = mongoose.model('Image')

const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)

const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)

const uploadToQiniu = (url, key) => {
  return new Promise((resolve, reject) => {
    client.fetch(url, bucket, key, (err, ret, info) => {
      if (err) {
        reject(err)
      } else {
        if (info.statusCode === 200) {
          resolve({ key })
        } else {
          reject(info)
        }
      }
    })
  })
}

module.exports = async () => {
  let images = await Image.find({
    $or: [
      { urlKey: { $exists: false } },
      { urlKey: null },
      { urlKey: '' }
    ]
  })
  // console.log(images)
  for (let i = 0; i < images.length; i++) {
    let image = images[i]

    if (image.url && !image.urlKey) {
      try {
        console.log('开始上传 image', image.url)
        let imageData = await uploadToQiniu(image.url.replace(/\.jpg$/, '_1920x1080.jpg'), nanoid() + '.jpg')
        // console.log(imageData)
        if (imageData.key) {
          image.urlKey = imageData.key
        }
        // console.log(image)

        await image.save()
      } catch (err) {
        console.log(err)
      }
    }
  }
}