// sequelizeGetAllGamesystemsRepository.js

const container = require('../../../../shared/infrastructure/container/container');
const { Gamesystem } = require('./sequelizeGamesystemModel');

const MODULE_NAME = '[sequelizeGetAllGamesystems Repository]';

exports.execute = async () => {
  container.getLogger().debug(`${MODULE_NAME} (IN) --> no params`);

  const result = await Gamesystem.findAll();

  container.getLogger().debug(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};
