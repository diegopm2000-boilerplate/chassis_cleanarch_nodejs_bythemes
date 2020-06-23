// GetConfigController.js

const logger = require('../../../shared/infrastructure/log/logFacade');
const presenter = require('../../../shared/adapter/presenter/basePresenter');
const getConfigUC = require('../../usecase/getConfigUC');
const Repository = require('../../infrastructure/repository/MemoryConfigRepository');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[GetConfigController]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async () => {
  try {
    logger.info(`${MODULE_NAME} (IN) -> no params`);

    const result = await getConfigUC.execute({
      logger, presenter, Repository,
    });

    logger.info(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    logger.error(`${MODULE_NAME} (ERROR) -> error.stack: ${error.stack}`);
    throw error;
  }
};
