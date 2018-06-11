const express = require('express')
const hbs = require('hbs')
const app = express()
const mongodb = require('mongodb')
const request = require('request')
// const superagent = require('superagent')
// const assert = require('assert')
var url = 'mongodb://localhost:27017'
app.set('view engine', 'hbs')

app.get('/', (req, res)=>{
    res.render('index', {name: 'read bookss'})
})




app.listen(3000, ()=> console.log('server is running'))