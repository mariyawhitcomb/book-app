const mongoose = require('../db/connection')
const Schema = mongoose.Schema
const moment = require('moment')
const User = require('../models/User')

const Note = new Schema({
    content: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }
});

const Book = new Schema ({
    title: String,
    description: String,
    author: String,
    rank: Number,
    notes: [Note],
    amazon_product_url: String,
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

// Note.post('save', function(){
//     User.findOne()
// })
Note
.virtual('createdAtFormatted')
.get(function () {
  return moment(this.createdAt).format('MMMM Do, YYYY');
});

module.exports = {
    Book: mongoose.model('Book', Book),
    Note: mongoose.model('Note', Note)
}