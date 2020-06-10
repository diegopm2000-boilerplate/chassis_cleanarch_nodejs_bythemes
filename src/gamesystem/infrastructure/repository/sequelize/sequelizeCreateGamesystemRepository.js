// sequelizeCreateGamesystemRepository.js

const container = require('../../../../shared/infrastructure/container/container');
const { Gamesystem } = require('./sequelizeGamesystemModel');

const MODULE_NAME = '[sequelizeCreateGamesystem Repository]';

exports.execute = async (newObj) => {
  container.getLogger().debug(`${MODULE_NAME} (IN) --> newObj: ${JSON.stringify(newObj)}`);

  const result = await Gamesystem.create(newObj);

  container.getLogger().debug(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};
