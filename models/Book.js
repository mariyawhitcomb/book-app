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
    notes: [Note
    //     {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Note'
    // }
],
    amazon_product_url: String,
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

// Note.pre('remove', function(next) {
//     // 'this' is the client being removed. Provide callbacks here if you want
//     // to be notified of the calls' result.
//     Book.findOne({})
//     Sweepstakes.remove({_id: this._id}).exec();
//     Submission.remove({client_id: this._id}).exec();
//     next();
// });
Note
.virtual('createdAtFormatted')
.get(function () {
  return moment(this.createdAt).format('MMMM Do, YYYY');
});

module.exports = {
    Book: mongoose.model('Book', Book),
    Note: mongoose.model('Note', Note)
}