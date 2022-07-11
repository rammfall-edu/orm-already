'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('projects', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        nullable: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        nullable: false,
      },
      description: {
        type: Sequelize.STRING,
      },
    });

    await queryInterface.addColumn('projects', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('projects');
  },
};
