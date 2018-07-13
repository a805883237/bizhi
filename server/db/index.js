const mongoose = require('mongoose')
const config = require('../config')

let db = config.dbProd
// mongodb pwd 不可以包含部分特殊符号 =, @, $
if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true)
  db = config.dbDev
}
console.log(db)
mongoose.connect(db,function (err) {
    if(err){
        console.log('数据库连接失败：'+err);
    }else {
        console.log('数据库成功连接到：'+db);
    }
})

mongoose.connection.on('disconnected', () => {
  throw new Error('数据库挂了')
})
mongoose.connection.on('error', err => {
  console.log("ccccccccc",err)
  throw new Error('数据库挂了吧')
})
mongoose.connection.once('open', () => {
  console.log('MongoDB Connected successfully!')
})

// init schema
require('./schema')