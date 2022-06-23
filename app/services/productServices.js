const productRepository = require("../repositories/productRepository");

module.exports = {
  // aman
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
    return productRepository.findProduct(id);
  },

  // aman
  async findProductPicByIdProduct(id) {
    return productRepository.findProductPicByIdProduct(id);
  },

  // aman
  async addProduct(requestBody) {
    return productRepository.addProduct(requestBody);
  },

  // aman
  async addProductPic(requestBody) {
    return productRepository.addProductPic(requestBody);
  },

  // aman
  async updateProduct(idProduct, requestBody) {
    return productRepository.updateProduct(idProduct, requestBody);
  },

  // aman
  async deleteProduct(id) {
    return productRepository.deleteProduct(id);
  },

  // aman
  async deleteProductPic(id) {
    return productRepository.deleteProductPic(id);
  },
};
