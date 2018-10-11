/*
  Collection of CRUD Queries to the Database
*/

const mongoose = require('mongoose')
const userSchema = require('../schema/User.js')

var user = mongoose.model('User', userSchema)

function registerUser (data) {
  // Using findOne because it returns null in case of no match
  return user.create({ Email: data.Email, Name: data.Name, Password: data.Password }).exec()
}

function updatePassword (email, password) {
  // Using findOne because it returns null in case of no match
  return user.findOneAndUpdate({ Email: email }, { Password: password }).exec()
}

module.exports = {
  'signup': registerUser,
  'updatePassword': updatePassword
}
