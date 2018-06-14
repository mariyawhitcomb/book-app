const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const Book = new Schema ({
    title: String,
    description: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    },
    rank: Number,
    // note: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Note'
    // },
    amazon_product_url: String
})

const Author = new Schema ({
    name: String,
    books: [Book]

})
module.exports = {
    Book: mongoose.model('Book', Book),
    Author: mongoose.model('Author', Author),
}