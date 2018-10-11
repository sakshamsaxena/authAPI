/* Require Modules */
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const validateParams = require('./util/validateParams.js')
const queries = require('./database/queries.js')
const user = require('./database/insertions.js')

/* Our App! */
const app = express()

/* Basic Middlewares */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'))
app.set('json spaces', 4)

/* Enable CORS, Set Response Type as JSON */
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Content-Type', 'application/json; charset=utf-8')
  next()
})

/* Routes */

// Sign Up
app.post('/register', function (req, res) {
  // Validate POST data
  validateParams(req.body, 'register')
    .then(function (params) {
      // Check if Email exists already or not
      req.body = params
      return queries.checkEmailValidity(params.Email)
    })
    .then(function () {
      // Write User Details to Database
      return user.signup(req.body)
    })
    .then(function () {
      // Send Successful Response
      res.status(201).send()
    })
    .catch(function (error) {
      // Invalid Params, Existing Email, or Database Failure
      res.status(403).send({
        'Error': error
      })
    })
})

// Login
app.post('/login', function (req, res) {
  // Validate POST data
  validateParams(req.body, 'login')
    .then(function (params) {
      // Check if Email and Password are correct or not
      req.body = params
      return queries.checkLoginValidity(params.Email, params.Password)
    })
    .then(function () {
      // Create a JWT with Email and Password, and send it in Response
    })
    .catch(function (error) {
      // Invalid Params or Wrong Credentials
      res.status(403).send({
        'Error': error
      })
    })
})

// Forgot Password
app.post('/forgot', function (req, res) {
  // Validate POST data
  validateParams(req.body, 'forgot')
    .then(function (params) {
      // Check if Email exists already or not
      return queries.checkEmailValidity(params.Email)
    })
    .then(function () {
      // Generate a New Password and Update it in Database
    })
    .then(function () {
      // Send Email
    })
    .catch(function (error) {
      // Invalid Email, Database Failure, or Email Failure
      res.status(403).send({
        'Error': error
      })
    })
})

// Render any other route than the ones defined anywhere in app as HTTP 404
app.use(function (req, res) {
  res.status(404).send({
    'Error': 'Invalid Request'
  })
})

/* Listen */
app.listen(3000, function () {
  console.log('Auth API live on port 3000!')
})

module.exports = app
