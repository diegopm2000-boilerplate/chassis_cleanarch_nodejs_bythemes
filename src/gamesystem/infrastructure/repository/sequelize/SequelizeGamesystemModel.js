// SequelizeGamesystemModel.js

/* eslint-disable class-methods-use-this */

const { Sequelize, Model, DataTypes } = require('sequelize');

class SequelizeGamesystemModel extends Model {
  static configure(sequelize) {
    super.init({
      id: { type: Sequelize.STRING, primaryKey: true },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    }, { sequelize, modelName: 'Gamesystem', timestamps: false });
    return this;
  }
}

module.exports = SequelizeGamesystemModel;
