"use strict";

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
      "typeUsers",
      [
        {
          type: "Seller",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Buyer",
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
      
     */
    await queryInterface.bulkDelete("typeUsers", null, {});
  },
};
