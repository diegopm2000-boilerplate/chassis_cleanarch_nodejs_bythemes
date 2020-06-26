// deleteVideogameRepository.js

const logger = require('../../../../shared/infrastructure/log/logFacade');
const SequelizeVideogameModel = require('./SequelizeVideogameModel');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[deleteVideogameRepository]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (id) => {
  logger.debug(`${MODULE_NAME} (IN) --> id: ${id}`);

  const innerResult = await SequelizeVideogameModel.destroy({
    where: { id },
  });
  logger.debug(`${this.constructor.name} (MID) --> number of rows deleted: ${innerResult}`);

  const result = (innerResult === 1);

  logger.debug(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};
