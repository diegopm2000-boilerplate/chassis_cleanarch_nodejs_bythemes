// loadConfigUC.js

const MODULE_NAME = '[loadConfig UC]';

exports.execute = async (repositories, presenter, logger) => {
  logger.debug(`${MODULE_NAME} (IN) --> params: no params`);

  // Load bootstrap variables from bootstrap Repository
  const bootstrapEnvVars = await repositories.bootstrap.load();
  logger.debug(`${MODULE_NAME} (MID) --> bootstrapEnvVars: ${JSON.stringify(bootstrapEnvVars)}`);

  // Check the configSource
  if (bootstrapEnvVars.configSource !== 'YAML_FILE' && bootstrapEnvVars.configSource !== 'GIT') {
    const msgError = 'Config Source not valid';
    logger.error(`${MODULE_NAME} (ERROR) --> error.message: ${msgError}`);
    throw new Error(msgError);
  }

  let config;
  if (bootstrapEnvVars.configSource === 'YAML_FILE') {
    config = await repositories.originPrimary.get({ filename: bootstrapEnvVars.configFileName });
  } else {
    config = await repositories.originSecondary.get({ filename: bootstrapEnvVars.configFileName, endpoint: bootstrapEnvVars.endpoint });
  }
  logger.debug(`${MODULE_NAME} (MID) --> config: ${JSON.stringify(config)}`);

  // Save config to destiny repository
  await repositories.destiny.set({ data: config });
  logger.debug(`${MODULE_NAME} (MID) --> config stored in destiny Repository`);

  // Build & Return result
  return presenter.presentObject(MODULE_NAME, logger, config);
};
