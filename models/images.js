'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Images.init({
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "imgUrl can't be null"
        },
        notEmpty: {
          msg: "imgUrl can't be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Images',
  });
  return Images;
};