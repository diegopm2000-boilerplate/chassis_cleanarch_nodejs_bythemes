// deleteGamesystemRepository.js

const logger = require('../../../../shared/infrastructure/log/logFacade');
const SequelizeGameSystemModel = require('./SequelizeGamesystemModel');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[deleteGamesystemRepository]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (id) => {
  logger.debug(`${MODULE_NAME} (IN) --> id: ${id}`);

  const innerResult = await SequelizeGameSystemModel.destroy({
    where: { id },
  });
  logger.debug(`${this.constructor.name} (MID) --> number of rows deleted: ${innerResult}`);

  const result = (innerResult === 1);

  logger.debug(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};
