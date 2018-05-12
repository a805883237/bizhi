const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImageSchema = new Schema({
  imageId: Number,
  url: String,
  urlKey: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
})
// 注意不能使用箭头函数
ImageSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = this.updatedAt = Date.now()
  } else {
    this.updatedAt = Date.now()
  }
  next()
})

mongoose.model('Image', ImageSchema)