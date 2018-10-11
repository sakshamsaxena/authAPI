/*
  Payload Model for Forgot Password Requests
*/

const validator = require('../util/validateEntity.js')
const ForgotPasswordModel = {
  'Email': ''
}

function generatePayload (body) {
  var model = ForgotPasswordModel
  if (validator.validateEmail(body.email)) {
    model.Email = validator.validateEmail(body.email)
  } else {
    return 'Invalid Email'
  }
  return model
}

module.exports = generatePayload
