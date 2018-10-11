/*
  User Schema
*/

let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = {
  Name: String,
  Password: String,
  Email: String
}

module.exports = new Schema(userSchema)
