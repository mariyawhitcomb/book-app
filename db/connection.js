const mongodb = require('mongodb')
const mongoose = require('mongoose')
const request = require('request')

if (process.env.NODE_ENV === "production") {
    mongoose.connect(process.env.MLAB_URL)
  } else {
    mongoose.connect("mongodb://localhost/booklocal");
  }

mongoose.Promise = Promise
module.exports = mongoose
