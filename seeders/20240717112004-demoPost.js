'use strict';
const fs = require('fs').promises
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const postData = JSON.parse(await fs.readFile('./post.json', 'utf-8'))
   const post = postData.map(el => {
    el.createdAt = new Date()
    el.updatedAt = new Date()
    return el
   })
   await queryInterface.bulkInsert('Posts', post, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Posts', null, {} )
  }
};
