const { products, productpics, users, transactions } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  findAll() {
    return products.findAll({
      include: [{ model: productpics }],
    });
  },

  getTotalProducts() {
    return products.count();
  },

  findProduct(id) {
    return products.findByPk(id, {
      include: [{ model: productpics }, { model: users }],
    });
  },

  findByName(nama) {
    return products.findAll({
      where: {
        nama: {
          [Op.iLike]: `%${nama}%`,
        },
      },
      include: [{ model: productpics }],
    });
  },

  findByKategory(kategori) {
    return products.findAll({
      where: {
        kategori: {
          [Op.iLike]: `${kategori}`,
        },
      },
      include: [{ model: productpics }],
    });
  },

  findByIdUser(idUser) {
    return products.findAll({
      where: {
        idUser,
      },
      include: [{ model: productpics }],
    });
  },

  findByUser(params) {
    return products.findAll({
      where: {
        [Op.and]: [
          { idUser: params.idUser },
          { minat: params.minat },
          { terjual: params.terjual },
        ],
      },
      include: [{ model: productpics }],
    });
  },

  findProductPicByIdProduct(id) {
    return productpics.findAll({
      where: { idProduct: id },
    });
  },

  addProduct(createArgs) {
    return products.create(createArgs);
  },

  addProductPic(createArgs) {
    return productpics.create(createArgs);
  },

  updateProduct(id, updateArgs) {
    return products.update(updateArgs, { where: { id } });
  },

  async deleteProduct(id) {
    await transactions.destroy({ where: { idProduk: id } });
    return products.destroy({
      where: { id },
      include: [{ model: productpics }],
    });
  },
  deleteProductPic(id) {
    return productpics.destroy({ where: { idProduct: id } });
  },
};
