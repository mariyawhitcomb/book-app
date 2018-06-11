const { Book } = require('../models/Book')

module.exports = {
    index: (req, res)=>{
        Book.find({})
        .sort({rank: -1})
        .limit(25)
        .populate('author')
        .then(books => {
            res.render('app/index', { books })
        })
    }
    // index: (req, res) => {
    //     res.send('index')
    // }
}