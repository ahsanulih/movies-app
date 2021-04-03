'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductionHouse extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ProductionHouse.init(
        {
            name_prodHouse: DataTypes.STRING,
            headquarters: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'ProductionHouse'
        }
    );
    ProductionHouse.associate = function (models) {
        ProductionHouse.hasMany(models.Movie);
    };
    return ProductionHouse;
};
