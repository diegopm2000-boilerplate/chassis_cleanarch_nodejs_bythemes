// LoadConfigAltController_Alt.js

const logger = require('../../../shared/infrastructure/log/logFacade');
const presenter = require('../../../shared/adapter/presenter/basePresenter');
const loadConfigUC = require('../../usecase/loadConfigUC');
const BootstrapRepository = require('../../infrastructure/repository/EnvVarsBootstrapRepository');
const PrimaryOriginRepository = require('../../infrastructure/repository/FileConfigRepository');
const SecondaryOriginRepository = require('../../infrastructure/repository/RemoteConfigRepository');
const DestinyRepository = require('../../infrastructure/repository/MemoryConfigRepository');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[LoadConfigController]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async () => {
  try {
    logger.info(`${MODULE_NAME} (IN) -> no params`);

    const result = await loadConfigUC.execute({
      logger, presenter, BootstrapRepository, PrimaryOriginRepository, SecondaryOriginRepository, DestinyRepository,
    });

    logger.info(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    logger.error(`${MODULE_NAME} (ERROR) -> error.stack: ${error.stack}`);
    throw error;
  }
};
