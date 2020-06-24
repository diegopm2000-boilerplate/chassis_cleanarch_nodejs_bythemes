// getAllGamesystemsRepository.js

const logger = require('../../../../shared/infrastructure/log/logFacade');
const SequelizeGameSystemModel = require('./SequelizeGamesystemModel');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[getAllGamesystemsRepository]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async () => {
  logger.debug(`${MODULE_NAME} (IN) --> no params`);

  const result = await SequelizeGameSystemModel.findAll();

  logger.debug(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};
