/* Require Modules */
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const validateParams = require('./util/validateParams.js')
const queries = require('./database/queries.js')
const user = require('./database/insertions.js')
const mongoose = require('mongoose')
const config = require('../config/config.js')
const base64 = require('base-64')

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
      mongoose.connect(config.MongoURL, { useNewUrlParser: true })
      return queries.checkEmailValidity(params.Email)
    })
    .then(function (result) {
      // Write User Details to Database
      if (result === null || result === []) {
        return user.signup(req.body)
      } else {
        throw new Error('User already exists : ' + result.Email)
      }
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
    .finally(function () {
      mongoose.connection.close()
    })
})

// Login
app.post('/login', function (req, res) {
  // Validate POST data
  validateParams(req.body, 'login')
    .then(function (params) {
      // Check if Email and Password are correct or not
      req.body = params
      mongoose.connect(config.MongoURL, { useNewUrlParser: true })
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
    .finally(function () {
      mongoose.connection.close()
    })
})

// Forgot Password
app.post('/forgot', function (req, res) {
  // Validate POST data
  validateParams(req.body, 'forgot')
    .then(function (params) {
      // Check if Email exists already or not
      req.body = params
      mongoose.connect(config.MongoURL, { useNewUrlParser: true })
      return queries.checkEmailValidity(params.Email)
    })
    .then(function (result) {
      // Generate a New Password and Update it in Database
      if (result !== null || result !== []) {
        var newPassword = base64.encode(req.body.Email + (Date.now()).toString())
        return user.updatePassword(result.Email, newPassword)
      } else {
        throw new Error('User does not exist : ' + result.Email)
      }
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
    .finally(function () {
      mongoose.connection.close()
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
