/* eslint-disable no-unused-vars */
"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            nama: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            kota: {
                type: Sequelize.STRING,
            },
            alamat: {
                type: Sequelize.STRING,
            },
            noHp: {
                type: Sequelize.STRING,
            },
            gambar: {
                type: Sequelize.STRING,
            },
            googleId: {
                type: Sequelize.STRING,
            },
            registeredVia: {
                type: Sequelize.STRING,
            },
            idType: {
                type: Sequelize.INTEGER,
                references: {
                    model: "typeUsers",
                    key: "id",
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("users");
    },
};
