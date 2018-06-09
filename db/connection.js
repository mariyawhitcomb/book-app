const mongoose = require('mongoose')
mongoose.connect('mongodb://mariyawhitcomb:sakypmen7@ds153890.mlab.com:53890/nytimes_books')
mongoose.Promise = Promise
module.exports = mongoose