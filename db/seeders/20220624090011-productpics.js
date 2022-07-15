/* eslint-disable no-unused-vars */
"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "productpics",
            [
                {
                    idProduct: 1,
                    gambar: "https://res.cloudinary.com/haihaikal/image/upload/v1656061178/obat_kfdtsi.jpg",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idProduct: 1,
                    gambar: "https://res.cloudinary.com/haihaikal/image/upload/v1656061177/sepatu_injpo4.jpg",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idProduct: 2,
                    gambar: "https://res.cloudinary.com/haihaikal/image/upload/v1656061177/motor_r5dws1.jpg",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idProduct: 2,
                    gambar: "https://res.cloudinary.com/haihaikal/image/upload/v1656061177/sepatu_injpo4.jpg",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idProduct: 3,
                    gambar: "https://res.cloudinary.com/haihaikal/image/upload/v1656061177/baju_batman_xi9v0p.jpg",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idProduct: 3,
                    gambar: "https://res.cloudinary.com/haihaikal/image/upload/v1656061177/sepatu_injpo4.jpg",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idProduct: 4,
                    gambar: "https://res.cloudinary.com/haihaikal/image/upload/v1656061177/kabel_hxsfhp.jpg",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idProduct: 4,
                    gambar: "https://res.cloudinary.com/haihaikal/image/upload/v1656061177/sepatu_injpo4.jpg",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idProduct: 5,
                    gambar: "https://res.cloudinary.com/haihaikal/image/upload/v1656061178/obat_kfdtsi.jpg",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idProduct: 5,
                    gambar: "https://res.cloudinary.com/haihaikal/image/upload/v1656061177/sepatu_injpo4.jpg",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idProduct: 6,
                    gambar: "https://res.cloudinary.com/haihaikal/image/upload/v1656061178/obat_kfdtsi.jpg",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idProduct: 6,
                    gambar: "https://res.cloudinary.com/haihaikal/image/upload/v1656061177/sepatu_injpo4.jpg",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idProduct: 7,
                    gambar: "https://res.cloudinary.com/haihaikal/image/upload/v1656061177/motor_r5dws1.jpg",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idProduct: 7,
                    gambar: "https://res.cloudinary.com/haihaikal/image/upload/v1656061177/sepatu_injpo4.jpg",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idProduct: 8,
                    gambar: "https://res.cloudinary.com/haihaikal/image/upload/v1656061177/baju_batman_xi9v0p.jpg",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idProduct: 8,
                    gambar: "https://res.cloudinary.com/haihaikal/image/upload/v1656061177/sepatu_injpo4.jpg",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idProduct: 9,
                    gambar: "https://res.cloudinary.com/haihaikal/image/upload/v1656061177/kabel_hxsfhp.jpg",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idProduct: 9,
                    gambar: "https://res.cloudinary.com/haihaikal/image/upload/v1656061177/sepatu_injpo4.jpg",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idProduct: 10,
                    gambar: "https://res.cloudinary.com/haihaikal/image/upload/v1656061178/obat_kfdtsi.jpg",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    idProduct: 10,
                    gambar: "https://res.cloudinary.com/haihaikal/image/upload/v1656061177/sepatu_injpo4.jpg",
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
        await queryInterface.bulkDelete("productpics", null, {});
    },
};
