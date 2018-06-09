const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const Book = new Schema ({
    name: String,
    description: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    },
    genre: {
        type: Schema.Types.ObjectId,
        ref: 'Genre'
    }
})
const Author = new Schema ({
    name: String,
    books: [Book]

})
const Genre = new Schema ({
    name: String,
    books: [Book]
})
module.exports = {
    Book: mongoose.model('Book', Book),
    Author: mongoose.model('Author', Author),
    Genre: mongoose.model('Genre', Genre)
}