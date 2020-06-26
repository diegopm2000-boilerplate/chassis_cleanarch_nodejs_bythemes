// updateVideogameUC.js

const Videogame = require('../domain/Videogame');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[updateVideogameUC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async ({
  logger, presenter, schemaValidator, getVideogameByIdRepository, getVideogameByFilterRepository, getGamesystemByIdRepository, updateVideogameRepository, params,
}) => {
  logger.debug(`${MODULE_NAME} (IN)  -> params: ${JSON.stringify(params)}`);

  // IN params
  const { dataIN, videogameId: id } = params;

  // Build data
  const data = JSON.parse(JSON.stringify(dataIN));
  data.id = id;

  // Create Domain Object
  const videogameDO = new Videogame(data, schemaValidator);
  if (videogameDO.errors && videogameDO.errors.length > 0) {
    return presenter.presentConflict(videogameDO.errors);
  }

  // Check if exists a Videogame with the same id
  let videogameFound = await getVideogameByIdRepository.execute(id);
  if (videogameFound == null) {
    return presenter.presentObjectNotFound();
  }

  // Check if exists a previous Videogame with the same name and distinct id
  const filter = { name: data.name };
  videogameFound = await getVideogameByFilterRepository.execute(filter);
  if (videogameFound != null && videogameFound.id !== id) {
    return presenter.presentConflict('There is a previous Videogame with the same name in the system');
  }

  // Check if exist the gamesystem related
  const gamesystemFound = await getGamesystemByIdRepository.execute(dataIN.gamesystemId);
  if (!gamesystemFound) {
    return presenter.presentConflict('There is not a previous Gamesystem with the same gamesystemId in the system');
  }

  // Persistence
  const innerResult = await updateVideogameRepository.execute(id, videogameDO);
  logger.debug(`${MODULE_NAME} (MID) -> innerResult: ${JSON.stringify(innerResult)}`);

  // Load the updated object
  const updatedObj = await getVideogameByIdRepository.execute(id);

  // Build & Return result
  const result = presenter.presentObject(updatedObj);
  logger.debug(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
};
