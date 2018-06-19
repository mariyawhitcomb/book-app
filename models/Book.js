const mongoose = require('../db/connection')
const Schema = mongoose.Schema

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
    amazon_product_url: String
})

// const Author = new Schema ({
//     name: String,
//     books: [Book]

module.exports = {
    Book: mongoose.model('Book', Book),
    Note: mongoose.model('Note', Note)
}