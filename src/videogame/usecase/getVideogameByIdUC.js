// getVideogameByIdUC.js

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[getVideogameByIdUC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async ({
  logger, presenter, getVideogameByIdRepository, params,
}) => {
  logger.debug(`${MODULE_NAME} (IN)  -> params: ${JSON.stringify(params)}`);

  // IN params
  const { videogameId: id } = params;

  // Get object from repository
  const innerResult = await getVideogameByIdRepository.execute(id);
  logger.debug(`${MODULE_NAME} (MID) -> innerResult: ${JSON.stringify(innerResult)}`);

  // Build & Return result
  const result = presenter.presentObject(innerResult);
  logger.debug(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
};
