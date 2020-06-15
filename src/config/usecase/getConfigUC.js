// getConfigUC.js

const MODULE_NAME = '[getConfig UC]';

exports.execute = async (configRepository, presenter, logger) => {
  logger.debug(`${MODULE_NAME} (IN) --> params: no params`);

  // Get Config from repository
  const innerResult = await configRepository.get();
  logger.debug(`${MODULE_NAME} (MID) --> innerResult: ${JSON.stringify(innerResult)}`);

  // Build & Return result
  return presenter.presentObject(MODULE_NAME, logger, innerResult);
};
