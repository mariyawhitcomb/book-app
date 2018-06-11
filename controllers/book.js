const { Book, Author } = require('../models/Book')
const { MyBook, Note } = require('../models/MyBook')
const request = require('request')

module.exports = {
    show: (req, res) => {
        Book.findOne({_id: req.params.id})
        .populate('author')
        .populate('note')
        res.send('/', {Book})
    },
//show one particular book

    index: (req, res)=>{
        res.send('hello')

    }
}