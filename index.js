/* Require Modules */
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const util = require('./util')

/* Our App! */
const app = express()

/* Basic Middlewares */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'))
app.set('json spaces', 4)

/* Routes */

// Enable CORS, Set Response Type as JSON
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Content-Type', 'application/json; charset=utf-8')
  next()
})

// Application Routes
app.post('/register', function (req, res) {
  util.validateParams(req.body, 'register')
    .then(function () {
      // params are valid, check email existence
      return checkEmailValidity(req.body.email)
    })
    .then(function () {
      // everything is okay, commit to db
    })
    .catch(function (error) {
      // invalid params (400) or email exists (409)
      res.status(422).send(error)
    })
})
app.post('/login', function (req, res) {
  util.validateParams(req.body, 'login')
    .then(function () {
      // params are valid, check email and password
      return checkEmailPasswordValidity(req.body.email)
    })
    .then(function () {
      // pair exists and is correct, return a jwt with email&pass
    })
    .catch(function (error) {
      // invalid params(400) or wrong creds(403)
      res.status(422).send(error)
    })
})
app.post('/forgot', function (req, res) {
  util.validateParams(req.body, 'forgot')
    .then(function () {
      // email is valid, reset password
      return resetPassword(req.body.email)
    })
    .then(function () {
      // password generated, send email
    })
    .catch(function (error) {
      // invalid email or failed to make password
      res.status(422).send(error)
    })
})

// Render any other route than the ones defined anywhere in app as HTTP 404
app.use(function (req, res) {
  res.status(404).send({
    Message: 'Invalid Request',
    DocsURL: 'DocsURL'
  })
})

/* Listen */
app.listen(3000, function () {
  console.log('Auth API live on port 3000!')
})

module.exports = app
