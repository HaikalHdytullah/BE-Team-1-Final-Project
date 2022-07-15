/* eslint-disable no-useless-catch */
const transactionRepository = require("../repositories/transactionRepository");

module.exports = {
    async getByIdBuyer(getArgs) {
        return await transactionRepository.getByIdBuyer(getArgs);
    },

    async getByIdSeller(getArgs) {
        return await transactionRepository.getByIdSeller(getArgs);
    },

    async create(createArgs) {
        return await transactionRepository.create(createArgs);
    },

    async update(id, status) {
        return await transactionRepository.update(id, status);
    },

    async updateStatus(args) {
        return await transactionRepository.updateStatus(args);
    },

    async updateAllTransaction(args) {
        return await transactionRepository.updateAllTransaction(args);
    },

    async delete(id) {
        return await transactionRepository.delete(id);
    },
};
