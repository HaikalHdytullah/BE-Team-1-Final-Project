"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      products.hasMany(models.ProductPics, { foreignKey: "idProduct" });
      products.hasOne(models.transactions, { foreignKey: "idProduct" });
    }
  }
  products.init(
    {
      idUser: DataTypes.INTEGER,
      idkategori: DataTypes.INTEGER,
      nama: DataTypes.STRING,
      harga: DataTypes.FLOAT,
      deskripsi: DataTypes.STRING,
      minat: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "products",
    }
  );
  return products;
};
