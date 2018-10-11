/*
  Payload Model for Sign Up Requests
*/

const validator = require('../util/validateEntity.js')
const RegisterModel = {
  'Name': '',
  'Email': '',
  'Password': ''
}

function generatePayload (body) {
  var model = RegisterModel
  if (validator.validateName(body.name)) {
    model.Name = validator.validateName(body.name)
  } else {
    return 'Invalid Name'
  }
  if (validator.validateEmail(body.email)) {
    model.Email = validator.validateEmail(body.email)
  } else {
    return 'Invalid Email'
  }
  if (validator.validatePassword(body.password)) {
    model.Password = validator.validatePassword(body.password)
  } else {
    return 'Invalid Password'
  }
  return model
}

module.exports = generatePayload
