const express = require('express')
const hbs = require('hbs')
const app = express()
const mongodb = require('mongodb')
const request = require('request')
// const superagent = require('superagent')
// const assert = require('assert')

const routes = require('./routes/index')
var url = 'mongodb://localhost:27017'
app.set('view engine', 'hbs')

// app.get('/', (req, res)=>{
//     res.render('app/index', {name: 'readbooks'})
// })
app.use('/', routes)





app.listen(3000, ()=> console.log('server is running'))