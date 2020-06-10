// createGamesystemUC.js

const { Gamesystem } = require('../domain/Gamesystem');

const MODULE_NAME = '[createGamesystem UC]';

exports.execute = async (commonProxyRepository, commonProxyInfra, presenter, logger, params) => {
  logger.info(`${MODULE_NAME} (IN) --> params: ${JSON.stringify(params)}`);

  // IN parameters
  const { dataIN } = params;

  // Build data
  const data = JSON.parse(JSON.stringify(dataIN));
  data.id = commonProxyInfra.get('uniqIdGeneratorInfra').generateUniqId();

  // Create Domain Object
  const gamesystemDO = new Gamesystem(data);
  if (gamesystemDO.errors && gamesystemDO.errors.length > 0) {
    return presenter.presentConflict(MODULE_NAME, logger, gamesystemDO.errors);
  }

  // Check if exists a previous Gamesystem with the same name
  const filter = { name: dataIN.name };
  const gamesystemFound = await commonProxyRepository.get('getGamesystemByFilterRepository').execute(filter);
  if (gamesystemFound != null) {
    return presenter.presentConflict(MODULE_NAME, logger, 'There is a previous gamesystem with the same name in the system');
  }

  // Persistence
  const innerResult = await commonProxyRepository.get('createGamesystemRepository').execute(gamesystemDO);
  logger.info(`${MODULE_NAME} (MID) --> innerResult: ${JSON.stringify(innerResult)}`);

  // Build & Return Result
  return presenter.presentCreatedObject(MODULE_NAME, logger, innerResult);
};
