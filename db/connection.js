const mongodb = require('mongodb')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/booklocal')
mongoose.Promise = Promise
module.exports = mongoose
