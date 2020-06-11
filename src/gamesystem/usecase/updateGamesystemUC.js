// updateGamesystemUC.js

const { Gamesystem } = require('../domain/Gamesystem');

const MODULE_NAME = '[updateGamesystem UC]';

exports.execute = async (commonProxyRepository, commonProxyInfra, presenter, logger, params) => {
  logger.debug(`${MODULE_NAME} (IN) --> params: ${JSON.stringify(params)}`);

  // Business IN parameters
  const { gamesystemId: id, dataIN } = params;

  const data = JSON.parse(JSON.stringify(dataIN));
  data.id = id;

  // Create Domain Object
  const gamesystemDO = new Gamesystem(data, commonProxyInfra.get('schemaValidatorInfra'));
  if (gamesystemDO.errors && gamesystemDO.errors.length > 0) {
    return presenter.presentConflict(MODULE_NAME, logger, gamesystemDO.errors);
  }

  // Check if exists a gamesystem with the same id
  let gamesystemFound = await commonProxyRepository.get('getGamesystemByIdRepository').execute(id);
  if (gamesystemFound == null) {
    return presenter.presentObjectNotFound(MODULE_NAME, logger);
  }

  // Check if exists a previous Gamesystem with the same name and distinct id
  const filter = { name: data.name };
  gamesystemFound = await commonProxyRepository.get('getGamesystemByFilterRepository').execute(filter);
  if (gamesystemFound != null && gamesystemFound.id !== id) {
    return presenter.presentConflict(MODULE_NAME, logger, 'There is a previous gamesystem with the same name in the system');
  }

  // Persistencia
  const innerResult = await commonProxyRepository.get('updateGamesystemRepository').execute(id, gamesystemDO);
  logger.debug(`${MODULE_NAME} (MID) --> innerResult: ${JSON.stringify(innerResult)}`);

  // Load the updated object
  const userUpdated = await commonProxyRepository.get('getGamesystemByIdRepository').execute(id);

  // Build & Returning Result
  return presenter.presentObject(MODULE_NAME, logger, userUpdated);
};
