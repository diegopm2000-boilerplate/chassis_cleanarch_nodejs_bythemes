// deleteGamesystemUC.js

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[deleteGamesystemUC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async ({
  logger, presenter, getGamesystemByIdRepository, deleteGamesystemRepository, params,
}) => {
  logger.debug(`${MODULE_NAME} (IN)  -> params: ${JSON.stringify(params)}`);

  // IN params
  const { gamesystemId: id } = params;

  // Check if exist the gamesystem
  const gamesystemFound = await getGamesystemByIdRepository.execute(id);
  if (!gamesystemFound) {
    return presenter.presentObjectNotFound();
  }

  // Remove object from repository
  const wasDeleted = await deleteGamesystemRepository.execute(id);
  logger.debug(`${MODULE_NAME} (MID) -> wasDeleted: ${JSON.stringify(wasDeleted)}`);

  // Build & Return result
  const result = presenter.presentResultOfDeletion(wasDeleted);
  logger.debug(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
};
