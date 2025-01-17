// deleteGamesystemUC.js

const MODULE_NAME = '[deleteGamesystem UC]';

exports.execute = async (commonProxyRepository, commonProxyInfra, presenter, logger, params) => {
  logger.debug(`${MODULE_NAME} (IN) --> params: ${JSON.stringify(params)}`);

  // Business IN parameters
  const { gamesystemId: id } = params;

  // Check if exist the gamesystem
  const gamesystemFound = await commonProxyRepository.get('getGamesystemByIdRepository').execute(id);
  if (!gamesystemFound) {
    return presenter.present({ case: presenter.OBJ_NOT_FOUND_PRESENT });
  }

  const wasDeleted = await commonProxyRepository.get('deleteGamesystemRepository').execute(id);
  logger.info(`${MODULE_NAME} (MID) --> wasDeleted: ${JSON.stringify(wasDeleted)}`);

  // Return result
  return presenter.presentResultOfDeletion(MODULE_NAME, logger, wasDeleted);
};
