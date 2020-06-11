// loadConfigUC.js

const MODULE_NAME = '[loadConfigEnhanced UC]';

exports.execute = async (commonProxyRepository, commonProxyInfra, presenter, logger, params) => {
  logger.debug(`${MODULE_NAME} (IN) --> params: ${JSON.stringify(params)}`);

  // Load params from environment variables
  const bootstrapEnvVars = commonProxyRepository.get('bootstrapRepository').load();
  logger.debug(`${MODULE_NAME} (MID) --> bootstrapEnvVars: ${bootstrapEnvVars}`);

  // Check the configSource
  if (bootstrapEnvVars.configSource !== 'YAML_FILE' && bootstrapEnvVars.configSource !== 'GIT') {
    const msgError = 'Config Source not valid';
    logger.error(`${MODULE_NAME} (ERROR) --> error.message: ${msgError}`);
    throw new Error(msgError);
  }

  // Set the initial config repository
  const initialConfigRepository = (bootstrapEnvVars.configSource === 'YAML_FILE') ? 'fileConfigRepository' : 'remoteConfigRepository';

  // Load config from initial repository
  const config = await commonProxyRepository.get(initialConfigRepository).getConfig(bootstrapEnvVars.configFileName, bootstrapEnvVars.endpoint);
  logger.debug(`${MODULE_NAME} (MID) --> config loaded from initial Repository`);

  // Save config to final repository
  await commonProxyRepository.get('containerConfigRepository').setConfig(config);
  logger.debug(`${MODULE_NAME} (MID) --> config stored in destiny Repository`);

  // Build & Return result
  return presenter.presentObject(MODULE_NAME, logger, config);
};
