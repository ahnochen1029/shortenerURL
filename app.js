const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const shortenURL = require('./models/link')

mongoose.connect('mongodb://localhost/shortener', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.render('index')
})

app.post('/shorten', (req, res) => {
  const url = req.body.url
  console.log('url', url)
  return shortenURL.create({
    url: url,
  })
    .then(() => { res.redirect('/') })
    .catch(err => console.log(err))
})

app.listen(port, () => {
  console.log(`The app is running on http://localhost:${port}`)
})