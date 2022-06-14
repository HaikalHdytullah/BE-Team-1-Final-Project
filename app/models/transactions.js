"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transactions.belongsTo(models.users, { foreignKey: "idUser" });
      transactions.belongsTo(models.products, { foreignKey: "idProduct" });
    }
  }
  transactions.init(
    {
      idProduct: DataTypes.INTEGER,
      idUser: DataTypes.INTEGER,
      status: DataTypes.STRING,
      penawaran: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "transactions",
    }
  );
  return transactions;
};
