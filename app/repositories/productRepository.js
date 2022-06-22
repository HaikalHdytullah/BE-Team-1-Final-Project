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
    return products.findByPk({ where: { iduser: id } });
  },

  addProduct(createArgs) {
    return products.create(createArgs);
  },

  addProductPic(createArgs) {
    return productpics.create(createArgs);
  },

  addImageProduct(createArgs) {
    return ProductPics.create(createArgs);
  },

  updateProduct(id, updateArgs) {
    return products.update(updateArgs, { where: { id } });
  },
};
