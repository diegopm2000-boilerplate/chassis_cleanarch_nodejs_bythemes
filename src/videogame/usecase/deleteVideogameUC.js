// deleteVideogameUC.js

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[deleteVideogameUC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async ({
  logger, presenter, getVideogameByIdRepository, deleteVideogameRepository, params,
}) => {
  logger.debug(`${MODULE_NAME} (IN)  -> params: ${JSON.stringify(params)}`);

  // IN params
  const { videogameId: id } = params;

  // Check if exist the Videogame
  const videogameFound = await getVideogameByIdRepository.execute(id);
  if (!videogameFound) {
    return presenter.presentObjectNotFound();
  }

  // Remove object from repository
  const wasDeleted = await deleteVideogameRepository.execute(id);
  logger.debug(`${MODULE_NAME} (MID) -> wasDeleted: ${JSON.stringify(wasDeleted)}`);

  // Build & Return result
  const result = presenter.presentResultOfDeletion(wasDeleted);
  logger.debug(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
};
