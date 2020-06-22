// loadConfigUC.js

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[loadConfigUC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async ({
  logger, presenter, BootstrapRepository, PrimaryOriginRepository, SecondaryOriginRepository, DestinyRepository,
}) => {
  logger.debug(`${MODULE_NAME} (IN) -> no params`);

  // Load bootstrap variables from bootstrap Repository
  const bootstrapEnvVars = await BootstrapRepository.load();
  logger.debug(`${MODULE_NAME} (MID) -> bootstrapEnvVars: ${JSON.stringify(bootstrapEnvVars)}`);

  // Check the configSource
  if (bootstrapEnvVars.configSource !== 'YAML_FILE' && bootstrapEnvVars.configSource !== 'GIT') {
    const msgError = 'Config Source not valid';
    logger.error(`${MODULE_NAME} (ERROR) -> error.message: ${msgError}`);
    throw new Error(msgError);
  }

  // Get config from origin repository
  let config;
  if (bootstrapEnvVars.configSource === 'YAML_FILE') {
    config = await PrimaryOriginRepository.get({ filename: bootstrapEnvVars.configFileName });
  } else {
    config = await SecondaryOriginRepository.get({ filename: bootstrapEnvVars.configFileName, endpoint: bootstrapEnvVars.endpoint });
  }
  logger.debug(`${MODULE_NAME} (MID) -> config: ${JSON.stringify(config)}`);

  // Save config to destiny repository
  await DestinyRepository.set({ data: config });
  logger.debug(`${MODULE_NAME} (MID) -> config stored in destiny Repository`);

  // Build & Return result
  return presenter.presentObject(config);
};
