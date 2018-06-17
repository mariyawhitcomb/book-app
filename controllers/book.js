const { Book, Author, Note } = require('../models/Book')
const User =require('../models/User')
const request = require('request')
const db = require('../db/connection')

module.exports = {
    show: (req, res) => {
        Book.findOne({_id: req.params.id})
        .populate('author')
        .exec(function(err, book){
            Note.populate(book.notes, { path: 'book', path: 'user'}, function(err, notes){
                book.notes = notes
                res.render('book/show', {book})
            })

        })
    },
    

    update: (req, res)=>{
        let { content } = req.body
        Book.findOne({_id: req.params.id})
        .then(book =>{
            book.notes.push({
                content,
                author: req.user.id
            });
            book.save(err => {
                res.redirect(`/book/${book._id}`)
            })
        })
        User.findOne({_id: req.user._id})
        .then(user=>{
            user.notes.push({
                content
            })
            user.save(err =>{
                console.log('user saved')
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
