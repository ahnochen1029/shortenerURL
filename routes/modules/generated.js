const express = require('express')
const router = express.Router()

const shortenLink = require('../../models/link')
const shortenerURL = require('../../shortenerURL')

router.post('/', (req, res) => {
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

router.get('/:shortenURL', (req, res) => {
  const shortURL = req.params.shortenURL
  console.log('shortURL', shortURL)

  let gotoURL = "/"
  shortenLink.find()
    .lean()
    .then(shorteners => {
      for (const shortener of shorteners) {
        if (shortURL === shortener.shortenUrl) {
          gotoURL = shortener.url
          return gotoURL
        }
      }
    })
    .then(() => res.redirect(gotoURL))
    .catch(err => console.log(err))
})


module.exports = router