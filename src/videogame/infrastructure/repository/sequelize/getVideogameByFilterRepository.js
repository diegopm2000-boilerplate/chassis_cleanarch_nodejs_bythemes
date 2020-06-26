// getVideogameByFilterRepository.js

const logger = require('../../../../shared/infrastructure/log/logFacade');
const SequelizeVideogameModel = require('./SequelizeVideogameModel');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[getVideogameByFilterRepository]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (filter) => {
  logger.debug(`${MODULE_NAME} (IN) --> filter: ${JSON.stringify(filter)}`);

  const result = await SequelizeVideogameModel.findOne({
    where: filter,
  });

  logger.debug(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};
