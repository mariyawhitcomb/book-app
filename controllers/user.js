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
    // show: (req, res)=>{
    //     Book.findOne({_id: req.params._id})
    //     .populate('notes')
    //     .populate('users')
    //     .then(book=>{
    //         res.render('book/show', {book})
    //     })
    // }
}
