'use strict';
const { Model } = require('sequelize');
const ageCounter = require('../helper/ageCounter')

module.exports = (sequelize, DataTypes) => {
    class MovieCast extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        get age_when_movie_released() {
            return ageCounter(this.Movie.released_year, this.Cast.birth_year)
        }

        static associate(models) {
            // define association here
        }
    }
    MovieCast.init(
        {
            MovieId: DataTypes.INTEGER,
            CastId: DataTypes.INTEGER,
            role:DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'MovieCast'
        }
    );
    MovieCast.associate = function (models) {
        MovieCast.belongsTo(models.Movie);
        MovieCast.belongsTo(models.Cast);
    };
    return MovieCast;
};
