const express = require('express')
const app = express()
const route = require('./routes/route')
const session = require('express-session')
const cookieParser = require('cookie-parser')

app.use(cookieParser());
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: 'mauahwdhbajdnakd9n2ubfubfjancaifnin', 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
  }));


app.use(route)

app.get('/', (req, res) => {
    res.redirect('/users/login')
})

app.get('*', (req, res) => {
    res.redirect('/users/login')
})

app.listen(3000, () => {
    console.log('server up running in port 3000')
})