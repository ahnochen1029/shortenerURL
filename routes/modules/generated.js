const express = require('express')
const router = express.Router()

const shortenLink = require('../../models/link')
const shortenerURL = require('../../shortenerURL')

//create shorten-URL
router.post('/', (req, res) => {
  const url = req.body.url
  let randomURL = ""
  let URLNotExist = true

  shortenLink.find()
    .lean()
    .then(urls => {
      //先尋找是否存在資料庫的url中，如存在直接調用
      for (const theurl of urls) {
        if (url === theurl.url) {
          randomURL = theurl.shortenUrl
          URLNotExist = false
          return URLNotExist, randomURL
        }
      }
      //如果在資料庫中不存在，新增randomURL亂碼
      if (URLNotExist) {
        randomURL = shortenerURL()
        shortenLink.create({
          url: url,
          shortenUrl: randomURL,
        })
        return randomURL
      }
    })
    .then(() => {
      res.render('generated', { randomURL })
    })
    .catch(err => console.log(err))

})

router.get('/:shortenURL', (req, res) => {
  const shortURL = req.params.shortenURL
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