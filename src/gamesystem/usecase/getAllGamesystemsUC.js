// getAllGamesystemsUC.js

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[getAllGamesystemsUC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async ({ logger, presenter, getAllGamesystemsRepository }) => {
  logger.debug(`${MODULE_NAME} (IN)  -> no params`);

  // Get objects from repository
  const innerResult = await getAllGamesystemsRepository.execute();
  logger.debug(`${MODULE_NAME} (MID) -> innerResult: ${JSON.stringify(innerResult)}`);

  // Build & Return result
  const result = presenter.presentObject(innerResult);
  logger.debug(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
};
