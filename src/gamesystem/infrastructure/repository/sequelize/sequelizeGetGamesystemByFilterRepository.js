// sequelizeGetGamesystemByFilterRepository.js

const container = require('../../../../shared/infrastructure/container/container');
const { Gamesystem } = require('./sequelizeGamesystemModel');

const MODULE_NAME = '[sequelizeGetGamesystemByFilter Repository]';

exports.execute = async (filter) => {
  container.getLogger().debug(`${MODULE_NAME} (IN) --> filter: ${JSON.stringify(filter)}`);

  const result = await Gamesystem.findOne({
    where: filter,
  });

  container.getLogger().debug(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};
