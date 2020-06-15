// bootstrapConfig.js

const EnvVarsBootstrapRepository = require('../../../../config/infrastructure/repository/EnvVarsBootstrapRepository');
const FileConfigRepository = require('../../../../config/infrastructure/repository/FileConfigRepository');
const RemoteConfigRepository = require('../../../../config/infrastructure/repository/RemoteConfigRepository');
const MemoryConfigRepository = require('../../../../config/infrastructure/repository/MemoryConfigRepository');
// TODO el logger mejor dejarlo detras de una Facade
const logger = require('../../log/logColorLogger');
const presenter = require('../../../adapter/presenter/objectPresenter');
const loadConfigUC = require('../../../../config/usecase/loadConfigUC');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[boostrapConfig]';

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

// TODO esto no sería un controller?

exports.init = async () => {
  logger.debug(`${MODULE_NAME} initConfig (IN) --> no params`);

  const repositories = {
    bootstrap: new EnvVarsBootstrapRepository(),
    originPrimary: new FileConfigRepository(),
    originSecondary: new RemoteConfigRepository(),
    destiny: new MemoryConfigRepository(),
  };

  const config = await loadConfigUC.execute(repositories, presenter, logger);

  logger.debug(`${MODULE_NAME} initConfig (OUT) --> config: ${JSON.stringify(config)}`);
  return config;
};
