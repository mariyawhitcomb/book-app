const { Book, Note } = require('../models/Book')
const bookSeedData = require('./bookSeedData')

bookSeedData.forEach(book => {
    Book.create({
        title: book.book_details[0].title,
        author: book.book_details[0].author,
        description: book.book_details[0].description,
        rank: book.rank,
        amazon_product_url: book.amazon_product_url,
        notes: []
    })
    .then(doneBook => {
        doneBook.save()
    })
})


// Author.find({}).remove(() => {
//     Book.find({}).remove(() => {
//         let gailh = Author.create({
//             name: "Gail Honeyman"

//         }).then(author => {
//             Promise.all([
//             Book.create({
//                 author: author._id,
//                 title: "ELEANOR OLIPHANT IS COMPLETELY FINE",
//                 description: "A young woman’s well-ordered life is disrupted by the I.T. guy from her office.",
//                 rank: 15,
//                 amazon_product_url: "https://www.amazon.com/Eleanor-Oliphant-Completely-Fine-Novel/dp/0735220697?tag=NYTBS-20"
//             }).then(book => {
//                 author.books.push(book)
//             })
//         ]).then(()=>{
//                 author.save(err => console.log(err))
//             })
//         })
//     })
// })
