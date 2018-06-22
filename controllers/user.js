const User = require('../models/User')
const express = require('express')
const passport = require('passport')
const { Book, Note } = require('../models/Book')


module.exports = {
    signup: (req, res)=>{
        res.render('user/signup', {message: req.flash('signupMessage')})
    },
    createSignup: (req, res)=>{
        var signupStrategy = passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/user/signup',
            failureFlash: true
        })
        return signupStrategy(req, res)
    },
    login: (req, res)=>{
        res.render('user/login', {message: req.flash('loginMessage')})
    },
    createLogin: (req, res)=>{
        var loginProperty = passport.authenticate('local-login',{
            successRedirect: '/',
            failureRedirect: '/user/login',
            failureFlash: true
        })
        return loginProperty(req, res)
    },
    logout: (req, res)=>{
        req.logout()
        res.redirect('/')

    },
    index: (req, res)=>{
        User.findOne({ _id: req.params.id })
        .populate('notes')
        .populate('books')
        .then(user => {
            res.render('user/mybooks', {user})
        })
    },
    update: (req, res)=>{
        User.findOne({_id: req.user._id})
        .then(user=>{
            Book.findOne({_id: req.body.bookId}).then(book => {
                user.books.push(book)
                book.users.push(user)
                book.save()
                user.save(err => {
                    if (err) console.log(err)
                    res.redirect('/')
                })
            })
        })
    },
    delete: (req, res)=>{
        Note.findOne({_id: req.body.noteId})
        .then(note=>{
            note.remove()
                .then(note => {
                    Book.findById(note.book)
                        .then(book => {
                            book.notes.id(note._id).remove()
                            book.save().then(() => res.redirect(`/book/${note.book}`))
                        })
                })
//5b2d15551b9dfb09c8fb4e85,
            // Promise.all([
            //     note,
            //     Book.findOne({_id: note.book._id})
            // ]).then(values=>{
            //     console.log(values[0]._id)
            //     console.log(values[1].notes)
            //     console.log(values[1].notes.filter(note => note._id !== values[0]._id))
            //     // console.log(values[1].notes.map(item => item._id));
            //     // console.log(values[1].notes.map(item => item._id).indexOf(values[0]._id))
            // })
            // note.remove()
            // .then(()=>{res.redirect('/')})
            
        //     Book.findOne({_id: note.book._id})
        //     .then(book=>{
        //         console.log(book.notes.map(id=>id._id).indexOf(note._id))
        //         book.save()
        //     }).then(()=>{
                
        // })
        
    })
    
}
}
