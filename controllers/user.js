const User = require('../models/User')
const express = require('express')
const passport = require('passport')
// const router = express.Router()
// function myBooks(){
// let checkbox = document.querySelectorAll('#indeterminate-checkbox')
// for(let i = 0; i<checkbox.length; i++){
//     if(checkbox[i].checked){
//         User.books.push(Book.findOne({_id: req.params.id}))
//     }
// }}
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
    show: (req, res)=>{
        User.findOne({ _id: req.params.id })
        .populate('notes')
        .then(user => {
            // Notes.find({author: user._id})
            // .then(usernotes=>{
            //     usernotes.forEach(note=>{
            //         user.notes.push(note)
            //     })
            // })
            res.render('user/show', {user})
        })


    }
}
