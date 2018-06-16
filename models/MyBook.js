const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const MyBook = new Schema({
    book: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }],
    note: {
        type: Schema.Types.ObjectId,
        ref: 'Note'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}) 
module.exports = mongoose.model('MyBook', MyBook)
