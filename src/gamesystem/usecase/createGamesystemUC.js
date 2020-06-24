// createGamesystemUC.js

const Gamesystem = require('../domain/Gamesystem');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[createGamesystemUC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async ({
  logger, presenter, uniqIdGenerator, schemaValidator, getGamesystemByFilterRepository, createGamesystemRepository, params,
}) => {
  logger.debug(`${MODULE_NAME} (IN)  -> params: ${JSON.stringify(params)}`);

  // IN params
  const { dataIN } = params;

  // Build data
  const data = JSON.parse(JSON.stringify(dataIN));
  data.id = uniqIdGenerator.generateUniqId();

  // Create Domain Object
  const gamesystemDO = new Gamesystem(data, schemaValidator);
  if (gamesystemDO.errors && gamesystemDO.errors.length > 0) {
    return presenter.presentConflict(gamesystemDO.errors);
  }

  // Check if exists a previous Gamesystem with the same name
  const filter = { name: dataIN.name };
  const gamesystemFound = await getGamesystemByFilterRepository.execute(filter);
  if (gamesystemFound != null) {
    return presenter.presentConflict('There is a previous gamesystem with the same name in the system');
  }

  // Persistence
  const innerResult = await createGamesystemRepository.execute(gamesystemDO);
  logger.debug(`${MODULE_NAME} (MID) -> innerResult: ${JSON.stringify(innerResult)}`);

  // Build & Return result
  const result = presenter.presentCreatedObject(innerResult);
  logger.debug(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
};
