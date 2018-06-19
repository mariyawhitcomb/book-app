const { Book, Note } = require('../models/Book')
const User =require('../models/User')
const request = require('request')
const db = require('../db/connection')

module.exports = {
    show: (req, res) => {
        Book.findOne({_id: req.params.id})
        .populate('notes')
        .then(book=>{
            res.render('book/show', {book})
        })
    },
    

    createnote: (req, res)=>{
        let { content } = req.body
        Book.findOne({_id: req.params.id})
        .then(book =>{
            var newNote = Note.create({
                content: content,
                author: req.user._id,
                book: book._id
            }).then(note => {
                // User.find({_id: note.author.id}).notes.push(newNote).save()
                // })
                book.notes.push(note)
                book.save(err => {
                    res.render('book/show', {book})
                })
            })
    })
},
    update: (req, res)=>{
        Book.findOne({_id: req.params.id})
        .then(book=>{
           var allNotes = Note.find({book: book._id}).toArray()
           allNotes.forEach(note => book.notes.push(note))
           book.save(err => {
               res.redirect('book/show')
           })
        })


    },
    destroy: (req, res)=>{

    },
    requireAuth: function(req, res, next) {
        if (req.isAuthenticated()) {
          next();
        } else {
          res.redirect("/");
        }
      }
}
