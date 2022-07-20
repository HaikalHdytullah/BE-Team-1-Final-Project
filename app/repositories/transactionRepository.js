const { transactions, products, users, productpics } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  getByIdBuyer(getArgs) {
    return transactions.findAll({
      include: [
        {
          model: products,
          include: [
            {
              model: productpics,
            },
          ],
        },
        {
          model: users,
        },
      ],
      where: {
        idUser: getArgs,
      },
    });
  },

  getByIdSeller(getArgs) {
    return transactions.findAll({
      include: [
        {
          model: products,
          where: { idUser: getArgs },
          include: [
            {
              model: productpics,
            },
          ],
        },
        {
          model: users,
        },
      ],
      where: {
        status: {
          [Op.or]: ["Menunggu", "Diproses"],
        },
      },
    });
  },

  create(createArgs) {
    products.update({ minat: true }, { where: { id: createArgs.idProduct } });
    return transactions.create(createArgs);
  },

  async update(id, status) {
    return await transactions.update({ status }, { where: { id } });
  },

  async updateStatus(args) {
    const { id, idProduk, status, terjual } = args;
    await products.update({ terjual: terjual }, { where: { id: idProduk } });
    await transactions.update({ status: status }, { where: { id: id } });
  },

  async updateAllTransaction(args) {
    return await transactions.update(
      { status: "Ditolak" },
      { where: { idProduct: args } }
    );
  },

  delete(id) {
    return transactions.destroy({ where: { id } });
  },
};
