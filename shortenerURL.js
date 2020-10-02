function shortenerURL() {
  const UppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const LowercaseLetters = UppercaseLetters.toLowerCase()
  const numbers = '0123456789'
  let collection = []
  collection = UppercaseLetters + LowercaseLetters + numbers

  randomLetter = ''

  for (let i = 0; i < 6; i++) {
    array = Math.floor(Math.random() * collection.length)
    randomLetter += collection[array]
  }

  return randomLetter
}

module.exports = shortenerURL