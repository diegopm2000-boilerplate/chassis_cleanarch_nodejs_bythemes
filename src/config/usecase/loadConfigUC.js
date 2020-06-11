// loadConfigUC.js

const MODULE_NAME = '[loadConfig UC]';

exports.execute = async (commonProxyRepository, commonProxyInfra, presenter, logger, params) => {
  logger.debug(`${MODULE_NAME} (IN) --> params: ${JSON.stringify(params)}`);

  // IN parameters
  const {
    initialConfigRepository,
    finalConfigRepository,
    filename,
    endpoint,
  } = params;

  // Load config from initial repository
  const config = await commonProxyRepository.get(initialConfigRepository).getConfig(filename, endpoint);
  logger.debug(`${MODULE_NAME} (MID) --> config loaded from initial Repository`);

  // Save config to final repository
  await commonProxyRepository.get(finalConfigRepository).setConfig(config);
  logger.debug(`${MODULE_NAME} (MID) --> config stored in destiny Repository`);

  // Build & Return result
  return presenter.presentObject(MODULE_NAME, logger, config);
};
