// createVideogameUC.js

const Videogame = require('../domain/Videogame');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[createVideogameUC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async ({
  logger, presenter, uniqIdGenerator, schemaValidator, getVideogameByFilterRepository, createVideogameRepository, getGamesystemByIdRepository, params,
}) => {
  logger.debug(`${MODULE_NAME} (IN)  -> params: ${JSON.stringify(params)}`);

  // IN params
  const { dataIN } = params;

  // Build data
  const data = JSON.parse(JSON.stringify(dataIN));
  data.id = uniqIdGenerator.generateUniqId();

  // Create Domain Object
  const videogameDO = new Videogame(data, schemaValidator);
  if (videogameDO.errors && videogameDO.errors.length > 0) {
    return presenter.presentConflict(videogameDO.errors);
  }

  // Check if exists a previous Videogame with the same name
  const filter = { name: dataIN.name };
  const videogameFound = await getVideogameByFilterRepository.execute(filter);
  if (videogameFound != null) {
    return presenter.presentConflict('There is a previous Videogame with the same name in the system');
  }

  // Check if exist the gamesystem related
  const gamesystemFound = await getGamesystemByIdRepository.execute(dataIN.gamesystemId);
  if (!gamesystemFound) {
    return presenter.presentConflict('There is not a previous Gamesystem with the same gamesystemId in the system');
  }

  // Persistence
  const innerResult = await createVideogameRepository.execute(videogameDO);
  logger.debug(`${MODULE_NAME} (MID) -> innerResult: ${JSON.stringify(innerResult)}`);

  // Build & Return result
  const result = presenter.presentCreatedObject(innerResult);
  logger.debug(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
};
