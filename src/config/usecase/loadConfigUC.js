// loadConfigUC.js

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[loadConfigUC]';

const BOOTSTRAP_CONFIG_SOURCE_APP = 'BOOTSTRAP_CONFIG_SOURCE_APP';
const BOOTSTRAP_CONFIG_FILE = 'BOOTSTRAP_CONFIG_FILE';
const BOOTSTRAP_CONFIG_SPRINGCFG_ENDPOINT = 'BOOTSTRAP_CONFIG_SPRINGCFG_ENDPOINT';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async ({
  logger, presenter, bootstrapGetRepository, primaryConfigGetRepository, secondaryConfigGetRepository, destinyConfigSetRepository,
}) => {
  logger.debug(`${MODULE_NAME} (IN) -> no params`);

  // Load bootstrap variables from bootstrap Repository
  const configSource = bootstrapGetRepository.execute(BOOTSTRAP_CONFIG_SOURCE_APP);
  const configFile = await bootstrapGetRepository.execute(BOOTSTRAP_CONFIG_FILE);
  const endpoint = await bootstrapGetRepository.execute(BOOTSTRAP_CONFIG_SPRINGCFG_ENDPOINT);
  logger.debug(`${MODULE_NAME} (MID) -> bootstrap values loaded: configSource: ${configSource}, configFile: ${configFile}, endpoint: ${endpoint}`);

  // Check the configSource
  if (configSource !== 'YAML_FILE' && configSource !== 'GIT') {
    const msgError = 'Config Source not valid';
    logger.error(`${MODULE_NAME} (ERROR) -> error.message: ${msgError}`);
    throw new Error(msgError);
  }

  // Get config from origin repository
  let config;
  if (configSource === 'YAML_FILE') {
    config = await primaryConfigGetRepository.execute({ configFile });
  } else {
    config = await secondaryConfigGetRepository.execute({ configFile, endpoint });
  }
  logger.debug(`${MODULE_NAME} (MID) -> config: ${JSON.stringify(config)}`);

  // Save config to destiny repository
  await destinyConfigSetRepository.execute({ data: config });
  logger.debug(`${MODULE_NAME} (MID) -> config stored in destiny Repository`);

  // Build & Return result
  return presenter.presentObject(config);
};
