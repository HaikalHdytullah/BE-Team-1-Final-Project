const productRepository = require("../repositories/productRepository");

module.exports = {
    async list() {
        const products = await productRepository.findAll();
        const totalBarang = await productRepository.getTotalProducts();
        return {
            products,
            totalBarang,
        };
    },

    async getProductByIdSeller(idUser) {
        return await productRepository.findByIdUser(idUser);
    },

    async findByName(nama) {
        return await productRepository.findByName(nama);
    },

    async findByUser(params) {
        return await productRepository.findByUser(params);
    },

    async findByKategory(kategori) {
        return await productRepository.findByKategory(kategori);
    },

    async findById(id) {
        return await productRepository.findProduct(id);
    },

    async findProductPicByIdProduct(id) {
        return await productRepository.findProductPicByIdProduct(id);
    },

    async addProduct(requestBody) {
        return await productRepository.addProduct(requestBody);
    },

    async addProductPic(requestBody) {
        return await productRepository.addProductPic(requestBody);
    },

    async updateProduct(idProduct, requestBody) {
        return await productRepository.updateProduct(idProduct, requestBody);
    },

    async deleteProduct(id) {
        return await productRepository.deleteProduct(id);
    },

    async deleteProductPic(id) {
        return await productRepository.deleteProductPic(id);
    },
};
