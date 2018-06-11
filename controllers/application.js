const { Book } = require('../models/Book')
module.exports = {
    index: (req, res)=>{
        Book.find({})
        .sort({rating: -1})
        .limit(25)
        .populate('author')
        .populate('genge')
        .then(books => {
            res.render('app/index', { tweets })
        })
    }
}