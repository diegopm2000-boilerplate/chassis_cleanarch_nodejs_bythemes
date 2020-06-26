// sequelizeInfra.js

const { Sequelize } = require('sequelize');

const logger = require('../../log/logFacade');
const moduleInfra = require('../../util/moduleInfra');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[sequelizeInfra]';

let sequelize;

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.init = (options) => {
  logger.debug(`${MODULE_NAME} init (IN) --> options: ${JSON.stringify(options)}`);

  sequelize = new Sequelize(options.dbname, options.dbuser, options.dbpasswd, {
    host: options.dbhost,
    dialect: options.dbdialect,
    define: {
      timestamps: false, // I don't want timestamp fields by default
    },
  });

  const models = moduleInfra.getFilesByPattern('src/**/Sequelize*Model.js');

  models.forEach((x) => {
    const module = moduleInfra.loadModule(x);
    module.init(sequelize);
  });
  logger.debug(`${MODULE_NAME} init (MID) --> sequelize models initialized`);

  models.forEach((x) => {
    const module = moduleInfra.loadModule(x);
    module.initAssociations(sequelize);
  });
  logger.debug(`${MODULE_NAME} init (MID) --> sequelize models associations initialized`);

  logger.debug(`${MODULE_NAME} init (OUT) --> <<no result>>`);
};

exports.getSequelize = () => sequelize;
