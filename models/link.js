const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortenURLSchema = new Schema({
  url: {
    trpe: String,
  },
  shortenUrl: {
    type: String
  }
})

module.exports = mongoose.model('shortenURL', shortenURLSchema)