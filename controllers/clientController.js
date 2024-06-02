"use strict";
const { Product, User, Category, Images } = require("../models/index");

class Controller {
  static async clientHome(req, res, next) {
    try {
      const product = await Product.findAll({
        include: [User, Category, Images],
        order: [["id", "ASC"]],
      });
      res.status(200).json({
        statusCode: 200,
        data: product,
      });
    } catch (err) {
      next(err);
    }
  }

  static async clientGetCategory(req, res, next) {
    try {
      const category = await Category.findAll({
        include: [Product],
        order: [["id", "ASC"]],
      });

      res.status(200).json({
        statusCode: 200,
        category,
      });
    } catch (err) {
      next(err);
    }
  }

  static async clientGetImages(req, res, next) {
    try {
      const images = await Images.findAll({
        order: [["id", "ASC"]],
      });

      res.status(200).json({
        statusCode: 200,
        images,
      });
    } catch (err) {
      next(err);
    }
  }

  static async clientGetProductById(req, res, next) {
    try {
      const productId = +req.params.id;
      const detailProduct = await Product.findOne({
        where: {
          id: productId,
        },
        include: [User, Category, Images],
      });
      if (!detailProduct) {
        throw new Error("PRODUCT_NOT_FOUND");
      }

      res.status(200).json({
        statusCode: 200,
        data: detailProduct,
      });
    } catch (err) {
      next(err);
    }
  }
  static async clientGetProductByCategoryId(req, res, next) {
    try {
      const categoryId = +req.params.categoryId;
      const detailProduct = await Product.findAll({
        where: {
          categoryId
        },
        include: [User, Category, Images],
      });
      if (!detailProduct) {
        throw new Error("PRODUCT_NOT_FOUND");
      }

      res.status(200).json({
        statusCode: 200,
        data: detailProduct,
      });
    } catch (err) {
      next(err);
    }
  }

}

module.exports = Controller;
