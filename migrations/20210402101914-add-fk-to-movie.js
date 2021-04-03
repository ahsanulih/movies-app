'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Movies', {
      fields: ['ProductionHouseId'],
      type: 'foreign key',
      name: 'fk_movies_ProductionHouseId',
      references: {
        table: 'ProductionHouses',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Movies', 'fk_movie_ProductionHouseId');
  },
};
