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
    return productRepository.findProduct(id);
  },

  async findProductPic(id) {
    return productRepository.findProductPic(id);
  },

  async findProductPicByIdProduct(id) {
    return productRepository.findProductPicByIdProduct(id);
  },

  async addProduct(requestBody) {
    return productRepository.addProduct(requestBody);
  },

  async addProductPic(requestBody) {
    return productRepository.addProductPic(requestBody);
  },

  async updateProduct(idProduct, requestBody) {
    return productRepository.updateProduct(idProduct, requestBody);
  },

  async updateProductPic(id, requestBody) {
    return productRepository.updateProductPic(id, requestBody);
  },

  async deleteProduct(id) {
    return productRepository.deleteProduct(id);
  },

  async deleteProductPic(id) {
    return productRepository.deleteProductPic(id);
  },
};
