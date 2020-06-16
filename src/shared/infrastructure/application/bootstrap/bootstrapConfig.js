// bootstrapConfig.js

const EnvVarsBootstrapRepository = require('../../../../config/infrastructure/repository/EnvVarsBootstrapRepository');
const FileConfigRepository = require('../../../../config/infrastructure/repository/FileConfigRepository');
const RemoteConfigRepository = require('../../../../config/infrastructure/repository/RemoteConfigRepository');
const MemoryConfigRepository = require('../../../../config/infrastructure/repository/MemoryConfigRepository');
// TODO el logger mejor dejarlo detras de una Facade
const logger = require('../../log/logColorLogger');
const objectPresenter = require('../../../adapter/presenter/objectPresenter');
const LoadConfigController = require('../../../../config/adapter/controller/LoadConfigController');
const LoadConfigUC = require('../../../../config/usecase/LoadConfigUC');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[boostrapConfig]';

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.init = async () => {
  logger.debug(`${MODULE_NAME} initConfig (IN) --> no params`);

  const repositories = {
    bootstrap: new EnvVarsBootstrapRepository(),
    originPrimary: new FileConfigRepository(),
    originSecondary: new RemoteConfigRepository(),
    destiny: new MemoryConfigRepository(),
  };

  const loadConfigController = new LoadConfigController({
    logger, presenter: objectPresenter, UCClass: LoadConfigUC, repositories,
  });
  const config = await loadConfigController.execute();

  logger.debug(`${MODULE_NAME} initConfig (OUT) --> config: ${JSON.stringify(config)}`);
  return config;
};
