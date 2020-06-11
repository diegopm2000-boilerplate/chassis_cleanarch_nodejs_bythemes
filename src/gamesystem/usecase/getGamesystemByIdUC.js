// getGamesystemByIdUC.js

const MODULE_NAME = '[getGamesystemById UC]';

exports.execute = async (commonProxyRepository, commonProxyInfra, presenter, logger, params) => {
  logger.debug(`${MODULE_NAME} (IN) --> params: ${JSON.stringify(params)}`);

  // Business IN parameters
  const { gamesystemId: id } = params;

  const objFound = await commonProxyRepository.get('getGamesystemByIdRepository').execute(id);
  logger.debug(`${MODULE_NAME} (MID) --> objFound: ${JSON.stringify(objFound)}`);

  // Build and Return result
  return presenter.presentObjectIfFound(MODULE_NAME, logger, objFound);
};
