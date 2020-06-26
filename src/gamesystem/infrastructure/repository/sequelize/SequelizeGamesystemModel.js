// SequelizeGamesystemModel.js

const { Sequelize, Model, DataTypes } = require('sequelize');
const VideogamesystemModel = require('../../../../videogame/infrastructure/repository/sequelize/SequelizeVideogameModel');

class SequelizeGamesystemModel extends Model {
  static init(sequelize) {
    super.init({
      id: { type: Sequelize.STRING, primaryKey: true },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    }, { sequelize, modelName: 'Gamesystem', timestamps: false });

    return this;
  }

  static initAssociations() {
    // Realm has to many users
    super.hasMany(VideogamesystemModel, { foreignKey: 'gamesystemId' });
  }
}

module.exports = SequelizeGamesystemModel;
