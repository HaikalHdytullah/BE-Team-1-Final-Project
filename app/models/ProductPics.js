"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class productpics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      productpics.belongsTo(models.products, { foreignKey: "idProduct" });
    }
  }
  productpics.init(
    {
      idProduct: DataTypes.INTEGER,
      gambar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "productpics",
    }
  );
  return productpics;
};
