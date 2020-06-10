// sequelizeGamesystemModel.js

const { Sequelize, Model, DataTypes } = require('sequelize');

const container = require('../../../../shared/infrastructure/container/container');

class Gamesystem extends Model {}

const init = () => {
  Gamesystem.init({
    id: { type: Sequelize.STRING, primaryKey: true },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, { sequelize: container.getSequelizeInfra().getSequelize(), modelName: 'Gamesystem', timestamps: false });
};

const initAssociations = () => {
};

module.exports = {
  Gamesystem,
  init,
  initAssociations,
};
