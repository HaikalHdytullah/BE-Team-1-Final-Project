const { products, productpics } = require("../models");

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
    return products.findByPk(id, { include: [{ model: productpics }] });
  },

  findProductPicAll() {
    return productpics.findAll();
  },

  findProductPicByIdProduct(id) {
    return productpics.findAll({
      where: { idProduct: id },
    });
  },

  findProductPic(id) {
    return productpics.findByPk({ where: { idProduct: id } });
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

  updateProductPic(id, updateArgs) {
    return productpics.update(updateArgs, { where: { id } });
  },

  deleteProduct(id) {
    return products.destroy({ where: { id } });
  },

  deleteProductPic(id) {
    return productpics.destroy({ where: { idProduct: id } });
  },
};
