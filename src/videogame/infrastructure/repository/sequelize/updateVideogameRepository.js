// updateVideogameRepository.js

const logger = require('../../../../shared/infrastructure/log/logFacade');
const SequelizeVideogameModel = require('./SequelizeVideogameModel');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[updateVideogameRepository]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (id, data) => {
  logger.debug(`${MODULE_NAME} (IN) --> id: ${id}, data: ${JSON.stringify(data)}`);

  const result = await SequelizeVideogameModel.update(
    data, {
      where: { id },
    },
  );

  logger.debug(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};
