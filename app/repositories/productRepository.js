const { products, ProductPics } = require("../models");

module.exports = {
  findAll() {
    return products.findAll();
  },
  getTotalProducts() {
    return products.count();
  },
  findProduct(id) {
    return products.findByPk({ where: { iduser: id } });
  },

  addProduct(createArgs) {
    return products.create(createArgs);
  },

  addImageProduct(createArgs) {
    return ProductPics.create(createArgs);
  },

  updateProduct(id, updateArgs) {
    return products.update(updateArgs, { where: { id } });
  },
};
