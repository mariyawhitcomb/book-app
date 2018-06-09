const express = require('express')
const hbs = require('hbs')
const app = express()
app.set('view engine', 'hbs')

app.get('/', (req, res)=>{
    res.send('Hello world')
})


app.listen(3000, ()=> console.log('server is running'))