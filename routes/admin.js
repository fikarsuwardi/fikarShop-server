'use strict'

const express = require('express')
const adminRoutes = express.Router()
const Controller = require("../controllers/adminController")
const authorization = require("../middlewares/authz")
const authentication = require("../middlewares/authn")

adminRoutes.post("/login", Controller.login)
adminRoutes.use(authentication)
adminRoutes.post("/register", Controller.register)
adminRoutes.post("/product", Controller.postProduct)
adminRoutes.post("/category", Controller.postCategory)
adminRoutes.get("/product", Controller.getProduct)
adminRoutes.get("/category", Controller.getCategory)
adminRoutes.get("/images", Controller.getImages)
adminRoutes.get("/images/:productId", Controller.getImagesByProductId)
adminRoutes.put("/product/:id", authorization, Controller.putProductById)
adminRoutes.delete("/product/:id", authorization, Controller.deleteProductById)
adminRoutes.delete("/category/:id", authorization, Controller.deleteCategoryById)

module.exports = adminRoutes 