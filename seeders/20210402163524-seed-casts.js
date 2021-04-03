'use strict';

const fs = require('fs')
let data = JSON.parse(fs.readFileSync('./data/casts.json', {encoding: 'utf-8'}))

data = data.map(cast => {
  return {
    ...cast,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Casts', data, {});
    await queryInterface.sequelize.query(`SELECT setval('"Casts_id_seq"', (SELECT MAX(id)FROM "Casts"))`)
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
    await queryInterface.bulkDelete('Casts', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
