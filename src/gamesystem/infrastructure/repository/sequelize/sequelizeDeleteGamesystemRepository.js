// sequelizeDeleteGamesystemRepository.js

const container = require('../../../../shared/infrastructure/container/container');
const { Gamesystem } = require('./sequelizeGamesystemModel');

const MODULE_NAME = '[sequelizeDeleteGamesystem Repository]';

exports.execute = async (id) => {
  container.getLogger().debug(`${MODULE_NAME} (IN) --> id: ${id}`);

  const innerResult = await Gamesystem.destroy({
    where: { id },
  });
  container.getLogger().debug(`${MODULE_NAME} (MID) --> number of rows deleted: ${innerResult}`);

  const result = (innerResult === 1);

  container.getLogger().debug(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};
