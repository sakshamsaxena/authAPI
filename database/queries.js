/*
  Collection of Boolean Queries to the Database
*/

const mongoose = require('mongoose')
const userSchema = require('../schema/User.js')

var user = mongoose.model('User', userSchema)

function doesEmailExist (email) {
  // Using findOne because it returns null in case of no match
  return user.findOne({ Email: email }).exec()
}

function doesUserExist (email, password) {
  // Using findOne because it returns null in case of no match
  return user.findOne({ Email: email, Password: password }).exec()
}

module.exports = {
  'checkEmailValidity': doesEmailExist,
  'checkLoginValidity': doesUserExist
}
