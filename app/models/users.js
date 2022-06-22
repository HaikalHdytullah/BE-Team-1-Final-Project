"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.belongsTo(models.typeUser, { foreignKey: "idType" });
      users.hasMany(models.products, { foreignKey: "idUser" });
      users.hasMany(models.transactions, { foreignKey: "idUser" });
    }
  }
  users.init(
    {
      nama: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      kota: DataTypes.STRING,
      alamat: DataTypes.STRING,
      noHp: DataTypes.STRING,
      gambar: DataTypes.STRING,
      googleId: DataTypes.STRING,
      registeredVia: DataTypes.STRING,
      idType: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
