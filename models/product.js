'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {foreignKey: "categoryId"})
      Product.belongsTo(models.User, {foreignKey: "authorId"})
      Product.hasMany(models.Images, {foreignKey: "productId"})
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name can't be null"
        },
        notEmpty: {
          msg: "Name can't be empty"
        }
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description can't be null"
        },
        notEmpty: {
          msg: "Description can't be empty"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price can't be null"
        },
        notEmpty: {
          msg: "Price can't be empty"
        },
        min: {
          args: 1000,
          msg: "Minimum price is 1000"
        }
      }
    },
    mainImg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Image can't be null"
        },
        notEmpty: {
          msg: "Image can't be empty"
        }
      }
    },
    categoryId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });

  Product.beforeCreate((instance, options) => {
    instance.slug = instance.name.split(" ").join("-")
  })

  return Product;
};