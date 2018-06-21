const { Book } = require('../models/Book')
const request = require('request')
const fs = require('fs')

module.exports = {
    index: (req, res)=>{
      Book.find({})
        .sort({rank: -1})
        .limit(15)
        .then(books => {
            res.render('app/index', {books})
        })
      }
    }



        // request.get({
          //     url: "https://api.nytimes.com/svc/books/v3/lists.json",
          //     qs: {
          //       'api-key': "ae5d6e177cc8431fa709d27cb206971b",
          //       'list': "Combined Print and E-Book Fiction",
          //       'sort-order': "DESC"
          //     },
          //   }, function(err, response, body) {
          //     var books = JSON.parse(body);
          //     // console.log(books);
          //     res.render('app/index', { books: books.results })
          //   })
          // }