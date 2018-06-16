const mongodb = require('mongodb')
const mongoose = require('mongoose')
const request = require('request')

if (process.env.NODE_ENV === "production") {
    mongoose.connect(process.env.MLAB_URL)
  } else {
    mongoose.connect("mongodb://mariyawhitcomb:sakypmen7@ds153890.mlab.com:53890/nytimes_books");
  }

mongoose.Promise = Promise
module.exports = mongoose
