'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('MovieCasts', {
      fields: ['MovieId'],
      type: 'foreign key',
      name: 'custom_fk_MovieId',
      references: {
        table: 'Movies',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    await queryInterface.addConstraint('MovieCasts', {
      fields: ['CastId'],
      type: 'foreign key',
      name: 'custom_fk_CastId',
      references: {
        table: 'Casts',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('MovieCasts', 'custom_fk_MovieId');
    await queryInterface.removeConstraint('MovieCasts', 'custom_fk_CastId');
  },
};
