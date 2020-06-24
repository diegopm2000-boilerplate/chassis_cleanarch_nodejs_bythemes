// createGamesystemRepository.js

const logger = require('../../../../shared/infrastructure/log/logFacade');
const SequelizeGameSystemModel = require('./SequelizeGamesystemModel');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[createGamesystemRepository]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (newObj) => {
  logger.debug(`${MODULE_NAME} (IN) --> newObj: ${JSON.stringify(newObj)}`);

  const result = await SequelizeGameSystemModel.create(newObj);

  logger.debug(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};
