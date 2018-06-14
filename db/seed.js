// const { Book, Author } = require('../models/Book')

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
