"use strict";

const { compareHash } = require("../helpers/bcrypt");
const { createTokenFromData } = require("../helpers/token");
const { User, Product, Category, Images, sequelize } = require("../models/index");

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const newUser = await User.create({
        username,
        email,
        password,
        role: "admin",
        phoneNumber,
        address,
      });

      if (!newUser) {
        throw new Error("REGISTRATION_FAILED");
      }

      res.status(201).json({
        statusCode: 201,
        message: "Succes created user",
        data: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const foundUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!foundUser) {
        throw new Error("USER_NOT_FOUND");
      }

      const correctPassword = compareHash(password, foundUser.password);

      if (!correctPassword) {
        throw new Error("INVALID_PASSWORD");
      }

      //bikin payload dulu
      const payload = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role,
      };

      const access_token = createTokenFromData(payload);

      res.status(200).json({
        statusCode: 200,
        message: "Succes Login",
        access_token: access_token,
        payload,
      });
    } catch (err) {
      next(err);
    }
  }

  static async postProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {
        name,
        description,
        price,
        mainImg,
        categoryId,
        imgUrl1,
        imgUrl2,
        imgUrl3,
      } = req.body;
      const newProduct = await Product.create({
        name,
        slug: name.split(" ").join("-"),
        description,
        price,
        mainImg,
        authorId: +req.additionalData.id,
        categoryId: +categoryId,
      });

      const listImages = [
        { productId: newProduct.id, imgUrl: imgUrl1 },
        { productId: newProduct.id, imgUrl: imgUrl2 },
        { productId: newProduct.id, imgUrl: imgUrl3 },
      ];

      await Images.bulkCreate(listImages, { transaction: t });

      // Commit
      await t.commit();
      res.status(201).json({
        statusCode: 201,
        message: "Product created successfully",
        data: newProduct,
      });
    } catch (err) {
      // Rollback
      await t.rollback();
      next(err);
    }
  }

  static async postCategory(req, res, next) {
    try {
      const { name } = req.body;
      const newCategory = await Category.create({
        name,
      });

      // Berhasil bikin databaru
      res.status(201).json({
        statusCode: 201,
        message: "Category created successfully",
        data: newCategory,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getProduct(req, res, next) {
    try {
      const product = await Product.findAll({
        include: [User, Category, Images],
        order: [["id", "DESC"]],
      });
      res.status(200).json({
        statusCode: 200,
        data: product,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getCategory(req, res, next) {
    try {
      const category = await Category.findAll({
        include: [Product],
        order: [["id", "ASC"]],
      });
      res.status(200).json({
        statusCode: 200,
        data: category,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getImages(req, res, next) {
    try {
      const images = await Images.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json({
        statusCode: 200,
        data: images,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getImagesByProductId(req, res, next) {
    try {
      const productId = +req.params.productId;
      const images = await Images.findAll({
        where: {
          productId: productId
        },
        order: [["id", "ASC"]],
      });
      res.status(200).json({
        statusCode: 200,
        data: images,
      });
    } catch (err) {
      next(err);
    }
  }

  static async putProductById(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const productId = +req.params.id;
      const {
        name,
        description,
        price,
        mainImg,
        categoryId,
        imgUrl1,
        imgUrl2,
        imgUrl3,
      } = req.body;
      const slug = name.split(" ").join("-");
      const input = {
        name,
        slug,
        description,
        price,
        mainImg,
        authorId: +req.additionalData.id,
        categoryId,
      };

      const updateProduct = await Product.update(input, {
        where: {
          id: productId,
        },
      });

      const listImages = [
        { productId: updateProduct.id, imgUrl: imgUrl1 },
        { productId: updateProduct.id, imgUrl: imgUrl2 },
        { productId: updateProduct.id, imgUrl: imgUrl3 },
      ];

      await Images.update(listImages, { transaction: t });

      if (updateProduct <= 0) {
        throw new Error("PRODUCT_NOT_FOUND");
      }

      // Commit
      await t.commit();
      res.status(200).json({
        statusCode: 200,
        message: "Product has been updated successfully",
        data: input,
      });
    } catch (err) {
      // Rollback
      await t.rollback();
      next(err);
    }
  }

  static async deleteProductById(req, res, next) {
    try {
      const productId = +req.params.id;
      const destroyProduct = await Product.destroy({
        where: {
          id: productId,
        },
      });

      if (destroyProduct <= 0) {
        throw new Error("PRODUCT_NOT_FOUND");
      }

      res.status(200).json({
        statusCode: 200,
        message: `Product with id ${productId} deleted successfully`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategoryById(req, res, next) {
    try {
      const categoryId = +req.params.id;
      const destroyCategory = await Category.destroy({
        where: {
          id: categoryId,
        },
      });

      if (destroyCategory <= 0) {
        throw new Error("CATEGORY_NOT_FOUND");
      }

      res.status(200).json({
        statusCode: 200,
        message: `Category with id ${categoryId} deleted successfully`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
