'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Movie extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Movie.init(
        {
            name:  DataTypes.STRING,
            released_year: {
                type: DataTypes.INTEGER,
                validate: {
                    isYearNotKabisat(year) {
                        if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
                            console.log('kabisat')
                            throw new Error('Tahun release tidak boleh kabisat')
                        }
                    }
                }
            },
            genre: DataTypes.STRING,
            ProductionHouseId: DataTypes.INTEGER,
            rating: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'Movie'
        }
    );
    Movie.associate = function (models) {
        Movie.belongsTo(models.ProductionHouse);
        Movie.hasMany(models.MovieCast)
    };
    return Movie;
};
