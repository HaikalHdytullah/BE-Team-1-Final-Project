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
      products.belongsTo(models.users, { foreignKey: "idPenjual" });
      products.hasMany(models.transactions, { foreignKey: "idProduct" });
    }
  }
  products.init(
    {
      nama: DataTypes.STRING,
      harga: DataTypes.INTEGER,
      kategori: DataTypes.STRING,
      deskripsi: DataTypes.STRING,
      gambar: DataTypes.ARRAY(DataTypes.STRING),
      idPenjual: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "products",
    }
  );
  return products;
};
