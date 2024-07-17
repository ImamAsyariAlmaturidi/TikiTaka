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
    await queryInterface.addColumn('ProfilePosts', 'PostId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Posts",
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    })

    await queryInterface.addColumn('ProfilePosts', 'ProfileId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Profiles",
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
    await queryInterface.removeColumn('ProfilePosts', 'ProfileId')
    await queryInterface.removeColumn('ProfilePosts', 'PostId')
  }
};
