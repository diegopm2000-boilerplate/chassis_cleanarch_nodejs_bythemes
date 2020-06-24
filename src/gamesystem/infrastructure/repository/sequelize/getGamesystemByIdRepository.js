// getGamesystemByIdRepository.js

const logger = require('../../../../shared/infrastructure/log/logFacade');
const SequelizeGameSystemModel = require('./SequelizeGamesystemModel');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[getGamesystemByIdRepository]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (id) => {
  logger.debug(`${MODULE_NAME} (IN) --> id: ${id}`);

  if (id == null) {
    return undefined;
  }

  const result = await SequelizeGameSystemModel.findOne({
    where: { id },
  });

  logger.debug(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};
