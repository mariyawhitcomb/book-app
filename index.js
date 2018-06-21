const express = require('express')
const hbs = require('hbs')
const app = express()
const mongodb = require('mongodb')
const request = require('request')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const mogoose = require('mongoose')
const morgan = require('morgan')
const override = require('method-override')
const moment = require('moment');
const helpers = require('handlebars-helpers')()

// const superagent = require('superagent')
// const assert = require('assert')
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(override('_method'))
app.use(morgan('dev'))
app.use(flash())
app.use(session({secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS', resave: true, saveUninitialized: false}))
app.set('view engine', 'hbs');
hbs.registerHelper('ifcustom', function(id, arr, options){
  if(arr.some(function(user){
   return user._id === id
    
  })) 
   {
    return options.inverse(this)
  }
  return options.fn(this)
})
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + "/views/partials");

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use("/public", express.static(__dirname + "/public"));
app.use(function(req, res, next) {
  res.locals.currentUser = req.user
  next()
});

const routes = require('./routes/index')
app.use('/', routes)

app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), () => console.log("server is running"));
