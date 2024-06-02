// Model Foodnya !
const { Product } = require("../models/index");

const authorization = async (req, res, next) => {
  try {
    const role = req.additionalData.role;
    const productId = +req.params.id;

    // Querynya !
    const product = await Product.findByPk(productId);

    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    if (role !== "admin") {
        throw new Error("NOT_ALLOWED");
    }
    next(); // ini jngn dihapussss
  } catch (err) {
    next(err);
  }
};

module.exports = authorization;
