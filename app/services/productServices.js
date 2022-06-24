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
  async findByName(nama) {
    try {
      return productRepository.findByName(nama);
    } catch (error) {
      throw error;
    }
  },

  async findByMinat(idUser, minat) {
    try {
      return productRepository.findByMinat(idUser, minat);
    } catch (error) {
      throw error;
    }
  },
  async findByUser(idUser) {
    try {
      return productRepository.findByUser(idUser);
    } catch (error) {
      throw error;
    }
  },
  async findByKategory(kategori) {
    try {
      return productRepository.findByKategory(kategori);
    } catch (error) {
      throw error;
    }
  },

  async findById(id) {
    try {
      return productRepository.findProduct(id);
    } catch (error) {
      throw error;
    }
  },

  async findProductPicByIdProduct(id) {
    try {
      return productRepository.findProductPicByIdProduct(id);
    } catch (error) {
      throw error;
    }
  },

  async addProduct(requestBody) {
    try {
      return productRepository.addProduct(requestBody);
    } catch (error) {
      throw error;
    }
  },

  async addProductPic(requestBody) {
    try {
      return productRepository.addProductPic(requestBody);
    } catch (error) {
      throw error;
    }
  },

  async updateProduct(idProduct, requestBody) {
    try {
      return productRepository.updateProduct(idProduct, requestBody);
    } catch (error) {
      throw error;
    }
  },

  async deleteProduct(id) {
    try {
      return productRepository.deleteProduct(id);
    } catch (error) {
      throw error;
    }
  },

  async deleteProductPic(id) {
    try {
      return productRepository.deleteProductPic(id);
    } catch (error) {
      throw error;
    }
  },
};
