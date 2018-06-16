const mongodb = require('mongodb')
const mongoose = require('mongoose')
const request = require('request')
var allbooks = 
request.get({
  url: "https://api.nytimes.com/svc/books/v3/lists.json",
  qs: {
    'api-key': "ae5d6e177cc8431fa709d27cb206971b",
    'list': "Combined Print and E-Book Fiction",
    'sort-order': "DESC"
  },
}, function(err, response, body) {
  body = JSON.parse(body);
  console.log(body);
})
if (process.env.NODE_ENV === "production") {
    mongoose.connect(process.env.MLAB_URL)
  } else {
    mongoose.connect("mongodb://mariyawhitcomb:sakypmen7@ds153890.mlab.com:53890/nytimes_books");
    // mongoose.connect(allbooks)
  }

mongoose.Promise = Promise
module.exports = mongoose
// "https://api.nytimes.com/svc/books/v3/lists.json", query = list(api_key = "ae5d6e177cc8431fa709d27cb206971b")