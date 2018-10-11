/*
  Utility Class
*/

// Import Data Structure Payloads
var loginPayload = require('../models/login.js')
var registerPayload = require('../models/register.js')
var forgotPasswordPayload = require('../models/forgot.js')

function validateParams (body, type) {
  if (type === 'login') {
    return new Promise(function (resolve, reject) {
      var payload = loginPayload(body)
      if (typeof payload === 'object') {
        resolve(payload)
      } else {
        reject(payload)
      }
    })
  }
  if (type === 'register') {
    return new Promise(function (resolve, reject) {
      var payload = registerPayload(body)
      if (typeof payload === 'object') {
        resolve(payload)
      } else {
        reject(payload)
      }
    })
  }
  if (type === 'forgot') {
    return new Promise(function (resolve, reject) {
      var payload = forgotPasswordPayload(body)
      if (typeof payload === 'object') {
        resolve(payload)
      } else {
        reject(payload)
      }
    })
  }
}

module.exports = validateParams
