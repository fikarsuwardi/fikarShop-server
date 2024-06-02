'use strict'

const routes = require('express').Router()

const clientRoutes = require('./client')
const adminRoutes = require('./admin')

routes.use('/client', clientRoutes)
routes.use('/admin', adminRoutes)

module.exports = routes 