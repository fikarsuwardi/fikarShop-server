'use strict';

const express = require('express')
const clientRoutes = express.Router()
const Controller = require("../controllers/clientController")


clientRoutes.get("/product", Controller.clientHome)
clientRoutes.get("/category", Controller.clientGetCategory)
clientRoutes.get("/images", Controller.clientGetImages)
clientRoutes.get("/product/:id", Controller.clientGetProductById)
clientRoutes.get("/product-category/:categoryId", Controller.clientGetProductByCategoryId)

module.exports = clientRoutes