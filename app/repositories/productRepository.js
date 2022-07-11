const { products, productpics, users } = require("../models");
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

  findByMinat(idUser, minat) {
    return products.findAll({
      where: {
        [Op.and]: [{ idUser }, { minat }],
      },
      include: [{ model: productpics }],
    });
  },
  findByTerjual(idUser, terjual) {
    return products.findAll({
      where: {
        [Op.and]: [{ idUser }, { terjual }],
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

  findByUser(params) {
    if (params.minat === true) {
      return products.findAll({
        where: {
          [Op.and]: [{ idUser: params.idUser }, { minat: params.minat }],
        },
        include: [{ model: productpics }],
      });
    } else if (params.terjual === false || params.terjual === true) {
      return products.findAll({
        where: {
          [Op.and]: [{ idUser: params.idUser }, { terjual: params.terjual }],
        },
        include: [{ model: productpics }],
      });
    } else {
      return products.findAll({
        where: {
          idUser: params.idUser,
        },
        include: [{ model: productpics }],
      });
    }
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

  deleteProduct(id) {
    return products.destroy({
      where: { id },
      include: [{ model: productpics }],
    });
  },

  deleteProductPic(id) {
    return productpics.destroy({ where: { idProduct: id } });
  },
};
