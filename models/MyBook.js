const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const Note = new Schema({
    content: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }
})
const MyBook = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: 'Note'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}) 
module.exports = {
   Note: mongoose.model('Note', Note),
   MyBook: mongoose.model('MyBook', MyBook)
}