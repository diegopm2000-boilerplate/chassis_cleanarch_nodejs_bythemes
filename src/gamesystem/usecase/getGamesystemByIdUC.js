// getGamesystemByIdUC.js

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[getGamesystemByIdUC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async ({
  logger, presenter, getGamesystemByIdRepository, params,
}) => {
  logger.debug(`${MODULE_NAME} (IN)  -> params: ${JSON.stringify(params)}`);

  // IN params
  const { gamesystemId: id } = params;

  // Get object from repository
  const innerResult = await getGamesystemByIdRepository.execute(id);
  logger.debug(`${MODULE_NAME} (MID) -> innerResult: ${JSON.stringify(innerResult)}`);

  // Build & Return result
  const result = presenter.presentObject(innerResult);
  logger.debug(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
};
