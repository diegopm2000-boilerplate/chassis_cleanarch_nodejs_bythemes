// getVideogameByIdRepository.js

const logger = require('../../../../shared/infrastructure/log/logFacade');
const SequelizeVideogameModel = require('./SequelizeVideogameModel');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[getVideogameByIdRepository]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (id) => {
  logger.debug(`${MODULE_NAME} (IN) --> id: ${id}`);

  if (id == null) {
    return undefined;
  }

  const result = await SequelizeVideogameModel.findOne({
    where: { id },
  });

  logger.debug(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};
