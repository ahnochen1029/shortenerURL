const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const shortenLink = require('./models/link')
const shortenerURL = require('./shortenerURL')

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
  let randomURL = shortenerURL()

  return shortenLink.create({
    url: url,
    shortenUrl: randomURL,
  })
    .then(() => {
      res.render('generated', { randomURL })
    })
    .catch(err => console.log(err))

})

app.listen(port, () => {
  console.log(`The app is running on http://localhost:${port}`)
})