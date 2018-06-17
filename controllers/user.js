const User = require('../models/User')
const express = require('express')
const passport = require('passport')
// const router = express.Router()

module.exports = {
    signup: (req, res)=>{
        res.render('user/signup', {message: req.flash('signupMessage')})
    },
    createSignup: (req, res)=>{

        console.log(req.body)

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
        User.findOne({ _id: req.user._id })
        .exec(function(err, user){
            User.populate(user.notes, { path: 'note'}, function(err, notes){
                user.notes = notes
                console.log('it works')
            })

        })
        .then(user => {
            res.render('user/show', {user})
        })

    }
}