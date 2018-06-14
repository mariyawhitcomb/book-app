const { Book, Author } = require('../models/Book')
const { MyBook, Note } = require('../models/MyBook')
const request = require('request')
const db = require('../db/connection')

module.exports = {
    show: (req, res) => {
        Book.findOne({_id: req.params.id})
        .populate('author')
        .populate('note')
        res.send('/:id', {Book})
    },
//show one particular book

    index: (req, res)=>{
        res.redirect('/', {  })

    }
}