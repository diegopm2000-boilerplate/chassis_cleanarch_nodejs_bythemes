// updateGamesystemRepository.js

const logger = require('../../../../shared/infrastructure/log/logFacade');
const SequelizeGameSystemModel = require('./SequelizeGamesystemModel');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[updateGamesystemRepository]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (id, data) => {
  logger.debug(`${MODULE_NAME} (IN) --> id: ${id}, data: ${JSON.stringify(data)}`);

  const result = await SequelizeGameSystemModel.update(
    data, {
      where: { id },
    },
  );

  logger.debug(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};
