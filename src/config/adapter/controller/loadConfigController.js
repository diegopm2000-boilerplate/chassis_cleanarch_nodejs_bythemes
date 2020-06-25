// loadConfigController.js

const logger = require('../../../shared/infrastructure/log/logFacade');
const presenter = require('../../../shared/adapter/presenter/basePresenter');
const loadConfigUC = require('../../usecase/loadConfigUC');
const bootstrapGetRepository = require('../../infrastructure/repository/environmentVariables/environmentVariablesGetRepository');
const primaryConfigGetRepository = require('../../infrastructure/repository/file/fileGetConfigRepository');
const secondaryConfigGetRepository = require('../../infrastructure/repository/remote/remoteGetConfigRepository');
const destinyConfigSetRepository = require('../../infrastructure/repository/memory/memorySetConfigRepository');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[loadConfigController]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async () => {
  try {
    logger.info(`${MODULE_NAME} (IN) -> no params`);

    const result = await loadConfigUC.execute({
      logger, presenter, bootstrapGetRepository, primaryConfigGetRepository, secondaryConfigGetRepository, destinyConfigSetRepository,
    });

    logger.info(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    logger.error(`${MODULE_NAME} (ERROR) -> error.stack: ${error.stack}`);
    throw error;
  }
};
