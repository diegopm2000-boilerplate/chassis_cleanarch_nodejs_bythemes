// getAllGamesystemsUC.js

const MODULE_NAME = '[getAllGamesystems UC]';

exports.execute = async (commonProxyRepository, commonProxyInfra, presenter, logger, params) => {
  logger.info(`${MODULE_NAME} (IN) --> params: ${JSON.stringify(params)}`);

  const innerResult = await commonProxyRepository.get('getAllGamesystemsRepository').execute();
  logger.info(`${MODULE_NAME} (MID) --> innerResult: ${JSON.stringify(innerResult)}`);

  // Build & Return result
  return presenter.presentObject(MODULE_NAME, logger, innerResult);
};
