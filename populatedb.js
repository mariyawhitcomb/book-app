#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var { Book, Author } = require('./models/Book')
var MyBook = require('./models/MyBook')
var User = require('./models/User')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var authors = []
var books = []

function authorCreate(name, cb) {
  authordetail = {name: name }
  
  var author = new Author(authordetail);
       
  author.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Author: ' + author);
    authors.push(author)
    cb(null, author)
  }  );
}


function bookCreate(title, description, author, rank, amazon_product_url, cb) {
  bookdetail = { 
    title: title,
    description: description,
    author: author,
    rank: rank,
    // note: note,
    amazon_product_url: amazon_product_url
  }
  var book = new Book(bookdetail);    
  book.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Book: ' + book);
    books.push(book)
    cb(null, book)
  }  );
}




function createGenreAuthors(cb) {
    async.parallel([
        function(callback) {
          authorCreate('Patrick Rothfuss', callback);
        },
        function(callback) {
          authorCreate('Ben Bova', callback);
        },
        function(callback) {
          authorCreate('Isaac Asimov', callback);
        },
        function(callback) {
          authorCreate('Bob Billings', callback);
        },
        function(callback) {
          authorCreate('Jim Jones', callback);
        },
        ],
        // optional callback
        cb);
}


function createBooks(cb) {
    async.parallel([
        function(callback) {
          bookCreate('The Name of the Wind (The Kingkiller Chronicle, #1)', 'I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.', authors[0], 15, '', callback);
        },
        function(callback) {
          bookCreate("The Wise Man's Fear (The Kingkiller Chronicle, #2)", 'Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.', authors[0], 13, '', callback);
        }
        ],
        // optional callback
        cb);
}





async.series([
    createGenreAuthors,
    createBooks,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    
    // All done, disconnect from database
    mongoose.connection.close();
});