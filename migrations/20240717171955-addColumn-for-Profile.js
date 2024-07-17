'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Profiles', 'Likes', Sequelize.INTEGER)
    await queryInterface.addColumn('Profiles', 'Followers', Sequelize.INTEGER)
    await queryInterface.addColumn('Profiles', 'Following', Sequelize.INTEGER)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Profiles', 'Likes')
    await queryInterface.removeColumn('Profiles', 'Followers')
    await queryInterface.removeColumn('Profiles', 'Following')
  }
};
