const { Book, Note } = require('../models/Book')
const bookSeedData = require('./bookSeedData')

bookSeedData.forEach(book => {
    Book.create({
        title: book.book_details[0].title,
        author: book.book_details[0].author,
        description: book.book_details[0].description,
        rank: book.rank,
        amazon_product_url: book.amazon_product_url,
        notes: [],
        users: []
    })
    .then(doneBook => {
        doneBook.save()
    })
})