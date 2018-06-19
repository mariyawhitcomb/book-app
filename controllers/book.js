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
        Promise.all([
            User.findOne({_id: req.user._id}),
            Book.findOne({_id: req.params.id})
        ]).then(values => {
            Note.create({
                content: content,
                author: values[0]._id,
                book: values[1]._id
            })
            .then(note=>{
                values[0].notes.push(note)
                values[1].notes.push(note)
            })
            .then(()=>{
                values[0].save()
                values[1].save()
            })
            .then(()=>{
                res.render('book/show', {book: values[1]})

            })
        })
        // console.log(`Hello ${user}`)
        
        // .then(book =>{
        //         Note.create({
        //         content: content,
        //         author: req.user._id,
        //         book: book._id
        //     }).then(note => {
        //         // user.notes.push(note)
        //         book.notes.push(note)
        //         book.save(err => {
        //             res.render('book/show', {book})
        //         })
        //     })
    // })
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
