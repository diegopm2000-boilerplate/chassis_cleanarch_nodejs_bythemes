// sequelizeInfra.js

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const glob = require('glob');

const { Sequelize } = require('sequelize');

const logger = require('../../log/logFacade');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[sequelizeInfra]';

let sequelize;

// //////////////////////////////////////////////////////////////////////////////
// Private Functions
// //////////////////////////////////////////////////////////////////////////////

// TODO estos dos metodos se pueden sacar a una libreria de utilidad

const getSequelizeModels = () => {
  logger.debug(`${MODULE_NAME} getSequelizeModels (IN) --> no params`);

  const result = glob.sync('src/**/Sequelize*Model.js');

  logger.debug(`${MODULE_NAME} getSequelizeModels (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};

const loadModule = (pathfile) => {
  logger.debug(`${MODULE_NAME} loadModule (IN) --> pathfile: ${pathfile}`);

  const realPath = `../../../../../${pathfile}`;
  const module = require(realPath);
  logger.debug(`${MODULE_NAME} loadModule (MID) --> module loaded`);

  logger.debug(`${MODULE_NAME} loadModule (OUT) --> module: <<module>>`);
  return module;
};

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

// TODO cargar los modelos de forma dinámica

exports.init = (options) => {
  sequelize = new Sequelize(options.dbname, options.dbuser, options.dbpasswd, {
    host: options.dbhost,
    dialect: options.dbdialect,
    define: {
      timestamps: false, // I don't want timestamp fields by default
    },
  });

  const models = getSequelizeModels();

  models.forEach((x) => {
    const module = loadModule(x);
    module.init(sequelize);
  });

  models.forEach((x) => {
    const module = loadModule(x);
    module.initAssociations(sequelize);
  });
};

exports.getSequelize = () => sequelize;
