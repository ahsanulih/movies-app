'use strict';

const fs = require('fs')
let data = JSON.parse(fs.readFileSync('./data/movies.json', {encoding: 'utf-8'}))

data = data.map(movie => {
  return {
    ...movie,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Movies', data, {});
    await queryInterface.sequelize.query(`SELECT setval('"Movies_id_seq"', (SELECT MAX(id)FROM "Movies"))`)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Movies', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
