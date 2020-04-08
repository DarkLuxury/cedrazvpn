const express = require('express')
const routes = express.Router()

const createTest = require('./createTest.js')

routes.post('/novoteste', createTest.index)

module.exports = routes