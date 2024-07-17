const express = require('express')
const app = express()
const route = require('./routes/route')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.use(route)
app.get('/', (req, res) => {
    res.redirect('/users/login')
})
app.listen(3000, () => {
    console.log('server up running in port 3000')
})