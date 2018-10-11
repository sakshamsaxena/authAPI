/*
  Payload Model for Login Requests
*/

const validator = require('../util/validateEntity.js')
const LoginModel = {
  'Email': '',
  'Password': ''
}

function generatePayload (body) {
  var model = LoginModel
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
