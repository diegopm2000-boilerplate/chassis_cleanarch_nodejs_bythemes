// SequelizeVideogameModel.js

const { Sequelize, Model, DataTypes } = require('sequelize');

class SequelizeVideogameModel extends Model {
  static init(sequelize) {
    super.init({
      id: { type: Sequelize.STRING, primaryKey: true },
      name: DataTypes.STRING,
      developer: DataTypes.STRING,
      genre: DataTypes.STRING,
      year: DataTypes.INTEGER,
    }, { sequelize, modelName: 'Videogame', timestamps: false });
    return this;
  }

  static initAssociations() {
    // Nothing TO DO
  }
}

module.exports = SequelizeVideogameModel;
