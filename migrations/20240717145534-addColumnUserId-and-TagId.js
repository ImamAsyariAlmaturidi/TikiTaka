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
    await queryInterface.addColumn('Posts', 'ProfileId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Profiles',
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    })

    await queryInterface.addColumn('Posts', 'TagId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Tags',
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('Posts', 'ProfileId')
    await queryInterface.removeColumn('Posts', 'TagId')
  }
};
