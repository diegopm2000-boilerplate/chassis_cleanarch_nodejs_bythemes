// sequelizeUpdateGamesystemRepository.js

const container = require('../../../../shared/infrastructure/container/container');
const { Gamesystem } = require('./sequelizeGamesystemModel');

const MODULE_NAME = '[sequelizeUpdateGamesystem Repository]';

exports.execute = async (id, data) => {
  container.getLogger().debug(`${MODULE_NAME} (IN) --> id: ${id}, data: ${JSON.stringify(data)}`);

  const result = await Gamesystem.update(
    data, {
      where: { id },
    },
  );
  container.getLogger().debug(`${MODULE_NAME} (MID) --> number of rows updated: ${result}`);
  return result;
};
