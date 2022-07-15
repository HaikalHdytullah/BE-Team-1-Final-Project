/* eslint-disable no-unused-vars */
"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "products",
            [
                {
                    idUser: 1,
                    nama: "sepatu",
                    harga: 123,
                    kategori: "hobi",
                    deskripsi: "lorem",
                    minat: true,
                    terjual: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idUser: 1,
                    nama: "motor",
                    harga: 123,
                    kategori: "kendaraan",
                    deskripsi: "lorem",
                    minat: true,
                    terjual: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idUser: 1,
                    nama: "baju batman",
                    harga: 123,
                    kategori: "baju",
                    deskripsi: "lorem",
                    minat: true,
                    terjual: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idUser: 1,
                    nama: "kabel",
                    harga: 123,
                    kategori: "elektronik",
                    deskripsi: "lorem",
                    minat: true,
                    terjual: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idUser: 1,
                    nama: "obat",
                    harga: 123,
                    kategori: "kesehatan",
                    deskripsi: "lorem",
                    minat: true,
                    terjual: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },

                {
                    idUser: 2,
                    nama: "sepatu",
                    harga: 123,
                    kategori: "hobi",
                    deskripsi: "lorem",
                    minat: true,
                    terjual: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idUser: 2,
                    nama: "motor",
                    harga: 123,
                    kategori: "kendaraan",
                    deskripsi: "lorem",
                    minat: true,
                    terjual: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idUser: 2,
                    nama: "baju batman",
                    harga: 123,
                    kategori: "baju",
                    deskripsi: "lorem",
                    minat: true,
                    terjual: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idUser: 2,
                    nama: "kabel",
                    harga: 123,
                    kategori: "elektronik",
                    deskripsi: "lorem",
                    minat: true,
                    terjual: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idUser: 2,
                    nama: "obat",
                    harga: 123,
                    kategori: "kesehatan",
                    deskripsi: "lorem",
                    minat: true,
                    terjual: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("products", null, {});
    },
};
