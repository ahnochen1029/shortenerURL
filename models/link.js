const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortenURLSchema = new Schema({
  url: {
    type: String,
    required: true,
  },

  shortenUrl: {
    type: String,
  }
})

module.exports = mongoose.model('shortenURL', shortenURLSchema)