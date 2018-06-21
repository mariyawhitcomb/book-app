const { Book, Note } = require('../models/Book')
const User =require('../models/User')
const request = require('request')
const db = require('../db/connection')
const getCheck = require('../public/script')
var check = false

module.exports = {
    show: (req, res) => {
        check = false
        // if req.user
        //    - find book and populate notes
        //    - check if req.user._id is in book.users
        //    - render book/show with book and whether user has saved book flag
        // else 
        //    - render book/show without 
        
            Promise.all([
                User.findOne({_id: req.user._id}),
                Book.findOne({_id: req.params.id})
                .populate('notes')
            ]).then(values=>{
                Note.find({book: values[1]._id})
                .populate('author')
                console.log(values[1].users)
                console.log(values[0]._id)
                if (values[1].users.indexOf(values[0]._id)>=0){
                     check = true
                }
                console.log(check)
                res.render('book/show', { book: values[1], check })

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
},
    // update: (req, res)=>{
    //         Promise.all([
    //             User.findOne({_id: req.user._id}),
    //             Book.findOne({_id: req.body.bookId})
    //         ])
    //         .then(values=>{
    //             values[1].users.splice(values[1].users.indexOf(values[0]._id), 1)
    //             values[0].books.splice(values[0].books.indexOf(values[1]._id), 1)
    //             values[0].save(err=>{
    //                 if (err) console.log(err)
    //             })
    //             values[1].save(err=>{
    //                 if (err) console.log(err)
    //                 res.redirect('/')
    //             })
    //             })
    // },
    requireAuth: function(req, res, next) {
        if (req.isAuthenticated()) {
          next();
        } else {
          res.redirect("/");
        }
      }
}
