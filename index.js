const express = require('express')
const hbs = require('hbs')
const app = express()
app.set('view engine', 'hbs')

app.get('/', (req, res)=>{
    res.render('index', {name: 'read bookss'})
})


app.listen(3000, ()=> console.log('server is running'))