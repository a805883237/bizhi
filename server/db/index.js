const mongoose = require('mongoose')
const config = require('../config')

let db = config.dbProd

if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true)
  db = config.dbDev
}
mongoose.connect(db)

mongoose.connection.on('disconnected', () => {
  throw new Error('数据库挂了')
})
mongoose.connection.on('error', err => {
  throw new Error('数据库挂了吧')
})
mongoose.connection.once('open', () => {
  console.log('MongoDB Connected successfully!')
})

// init schema
require('./schema')