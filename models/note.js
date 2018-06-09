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
module.exports = mongoose.model('Note', Note)