// getAllGamesystemsUC.js

const MODULE_NAME = '[getAllGamesystems UC]';

exports.execute = async (gamesystemRepository, presenter, logger) => {
  logger.debug(`${MODULE_NAME} (IN) --> no params`);

  const innerResult = await gamesystemRepository.getAll();
  logger.debug(`${MODULE_NAME} (MID) --> innerResult: ${JSON.stringify(innerResult)}`);

  // Build & Return result
  return presenter.presentObject(MODULE_NAME, logger, innerResult);
};
