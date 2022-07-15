/* eslint-disable no-unused-vars */
"use strict";

const bcrypt = require("bcrypt");

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert(
            "users",
            [
                {
                    nama: "admin",
                    email: "admin@gmail.com",
                    password: bcrypt.hashSync("123", 10),
                    googleId: null,
                    registeredVia: "local",
                    idType: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    nama: "user",
                    email: "user@gmail.com",
                    password: bcrypt.hashSync("123", 10),
                    googleId: null,
                    registeredVia: "local",
                    idType: 2,
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
        await queryInterface.bulkDelete("users", null, {});
    },
};
