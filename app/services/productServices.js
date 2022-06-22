const productRepository = require("../repositories/productRepository");

module.exports = {
  async list() {
    try {
      const products = await productRepository.findAll();
      const totalBarang = await productRepository.getTotalProducts();
      return {
        products,
        totalBarang,
      };
    } catch (error) {
      throw error;
    }
  },

  async findById(id) {
    return userRepository.findProduct(id);
  },

  async addProduct(requestBody) {
    return productRepository.addProduct(requestBody);
  },

  async addProductPic(requestBody) {
    return productRepository.addProductPic(requestBody);
  },

  async addImageProduct(requestBody) {
    return productRepository.addImageProduct(requestBody);
  },
};
