// createVideogameRepository.js

const logger = require('../../../../shared/infrastructure/log/logFacade');
const SequelizeVideogameModel = require('./SequelizeVideogameModel');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[createVideogameRepository]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (newObj) => {
  logger.debug(`${MODULE_NAME} (IN) --> newObj: ${JSON.stringify(newObj)}`);

  const result = await SequelizeVideogameModel.create(newObj);

  logger.debug(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};
