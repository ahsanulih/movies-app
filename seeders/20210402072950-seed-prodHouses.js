'use strict';

const fs = require('fs')
let data = JSON.parse(fs.readFileSync('./data/productionHouses.json', {encoding: 'utf-8'}))

data = data.map(prodHouse => {
  return {
    ...prodHouse,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ProductionHouses', data, {});
    await queryInterface.sequelize.query(`SELECT setval('"ProductionHouses_id_seq"', (SELECT MAX(id)FROM "ProductionHouses"))`)
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
    await queryInterface.bulkDelete('ProductionHouses', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
