/*
  Utility Class
*/

// Import Data Structure Models
var loginModel = require('../models/login.js')
var registerModel = require('../models/register.js')
var forgotPasswordModel = require('../models/forgot.js')

function validateParams (body, type) {
  if (type === 'login') {
    return new Promise(function (resolve, reject) {
      var payload = loginModel.generatePayload(body)
      if (typeof payload === 'object') {
        resolve(payload)
      } else {
        reject(payload)
      }
    })
  }
  if (type === 'register') {
    return new Promise(function (resolve, reject) {
      var payload = registerModel.generatePayload(body)
      if (typeof payload === 'object') {
        resolve(payload)
      } else {
        reject(payload)
      }
    })
  }
  if (type === 'forgot') {
    return new Promise(function (resolve, reject) {
      var payload = forgotPasswordModel.generatePayload(body)
      if (typeof payload === 'object') {
        resolve(payload)
      } else {
        reject(payload)
      }
    })
  }
}

module.exports = validateParams
