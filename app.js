const express = require('express')
const app = express()
const route = require('./routes/route')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
      // Menyimpan file dengan nama original ditambah timestamp
    }
  })

  const upload = multer({ storage: storage })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.use(route)
app.get('/', (req, res) => {
    res.redirect('/users/login')
})
app.listen(3000, () => {
    console.log('server up running in port 3000')
})