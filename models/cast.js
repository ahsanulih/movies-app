'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cast extends Model {
        get full_name() {
            return this.first_name + ' ' + this.last_name;
        }

        static associate(models) {
            // define association here
        }
    }
    Cast.init(
        {
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            phone_number: DataTypes.STRING,
            birth_year: DataTypes.INTEGER,
            gender: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'Cast'
        }
    );
    Cast.associate = function (models) {
        Cast.hasMany(models.MovieCast);
    };
    Cast.beforeCreate((cast) => {
        if (!cast.last_name) {
            cast.last_name = cast.first_name;
        }
    });
    return Cast;
};
