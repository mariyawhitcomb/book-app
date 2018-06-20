const { Book, Note } = require('../models/Book')
const User =require('../models/User')
const request = require('request')
const db = require('../db/connection')

module.exports = {
    show: (req, res) => {
        var check
        Promise.all([
            User.findOne({_id: req.user._id}),
            Book.findOne({_id: req.params.id})
            .populate('notes')
            .populate('users')
        ]).then(values=>{
            Note.find({book: values[1]._id})
            .populate('author')
            console.log(`this is user${values[0]._id}`)

            check = values[1].users.map(user=>{user._id}).includes(values[0]._id)
            console.log(values[1].users)

            console.log(check)
            res.render('book/show', {book: values[1], check})
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
