// updateGamesystemUC.js

const Gamesystem = require('../domain/Gamesystem');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[updateGamesystemUC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async ({
  logger, presenter, schemaValidator, getGamesystemByIdRepository, getGamesystemByFilterRepository, updateGamesystemRepository, params,
}) => {
  logger.debug(`${MODULE_NAME} (IN)  -> params: ${JSON.stringify(params)}`);

  // IN params
  const { dataIN, gamesystemId: id } = params;

  // Build data
  const data = JSON.parse(JSON.stringify(dataIN));
  data.id = id;

  // Create Domain Object
  const gamesystemDO = new Gamesystem(data, schemaValidator);
  if (gamesystemDO.errors && gamesystemDO.errors.length > 0) {
    return presenter.presentConflict(gamesystemDO.errors);
  }

  // Check if exists a gamesystem with the same id
  let gamesystemFound = await getGamesystemByIdRepository.execute(id);
  if (gamesystemFound == null) {
    return presenter.presentObjectNotFound();
  }

  // Check if exists a previous Gamesystem with the same name and distinct id
  const filter = { name: data.name };
  gamesystemFound = await getGamesystemByFilterRepository.execute(filter);
  if (gamesystemFound != null && gamesystemFound.id !== id) {
    return presenter.presentConflict('There is a previous gamesystem with the same name in the system');
  }

  // Persistence
  const innerResult = await updateGamesystemRepository.execute(id, gamesystemDO);
  logger.debug(`${MODULE_NAME} (MID) -> innerResult: ${JSON.stringify(innerResult)}`);

  // Load the updated object
  const updatedObj = await getGamesystemByIdRepository.execute(id);

  // Build & Return result
  const result = presenter.presentObject(updatedObj);
  logger.debug(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
};
