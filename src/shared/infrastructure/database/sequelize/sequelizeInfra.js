// SequelizeInfra.js

const { Sequelize } = require('sequelize');

const SequelizeGamesystemModel = require('../../../../gamesystem/infrastructure/repository/sequelize/SequelizeGamesystemModel');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

let sequelize;
const models = {};

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.init = (options) => {
  sequelize = new Sequelize(options.dbname, options.dbuser, options.dbpasswd, {
    host: options.dbhost,
    dialect: options.dbdialect,
    define: {
      timestamps: false, // I don't want timestamp fields by default
    },
  });

  models.gameSystemModel = SequelizeGamesystemModel.configure(sequelize);
};

exports.getSequelize = () => sequelize;

exports.getModel = (nameModel) => models[nameModel];
