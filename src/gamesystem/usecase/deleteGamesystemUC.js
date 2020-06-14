// deleteGamesystemUC.js

const MODULE_NAME = '[deleteGamesystem UC]';

exports.execute = async (gamesystemRepository, presenter, logger, params) => {
  logger.debug(`${MODULE_NAME} (IN) --> params: ${JSON.stringify(params)}`);

  // Business IN parameters
  const { gamesystemId: id } = params;

  // Check if exist the gamesystem
  const gamesystemFound = await gamesystemRepository.getById(id);
  if (!gamesystemFound) {
    return presenter.presentObjectNotFound(MODULE_NAME, logger);
  }

  const wasDeleted = await gamesystemRepository.remove(id);
  logger.debug(`${MODULE_NAME} (MID) --> wasDeleted: ${JSON.stringify(wasDeleted)}`);

  // Return result
  return presenter.presentResultOfDeletion(MODULE_NAME, logger, wasDeleted);
};
