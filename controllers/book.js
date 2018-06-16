const { Book, Author, Note } = require('../models/Book')
const MyBook = require('../models/MyBook')
const request = require('request')
const db = require('../db/connection')

module.exports = {
    show: (req, res) => {
        Book.findOne({_id: req.params.id})
        .populate('author')
        .populate('note')
        .then(book=>{
        res.render('book/show', {book})
    })
    },
    index: (req, res)=>{
      res.redirect('/', {  })
}}