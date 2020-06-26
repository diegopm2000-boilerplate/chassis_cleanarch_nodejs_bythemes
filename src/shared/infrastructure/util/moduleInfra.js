// moduleInfra.js

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const glob = require('glob');

const logger = require('../log/logFacade');

// //////////////////////////////////////////////////////////////////////////////
// Constants & Properties
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[ModuleInfra]';

const relativePath = '../../../../';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.loadModule = (absFilePath) => {
  logger.debug(`${MODULE_NAME} loadModule (IN) --> relativePath: ${relativePath}, absFilePath: ${absFilePath}`);

  const module = require(`${relativePath}${absFilePath}`);
  logger.debug(`${MODULE_NAME} loadModule (MID) --> module loaded`);

  logger.debug(`${MODULE_NAME} loadModule (OUT) --> module: <<module>>`);
  return module;
};

exports.getFilesByPattern = (pattern) => {
  logger.debug(`${MODULE_NAME} getFilesByPattern (IN) --> no params`);

  const result = glob.sync(pattern);

  logger.debug(`${MODULE_NAME} getFilesByPattern (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};
