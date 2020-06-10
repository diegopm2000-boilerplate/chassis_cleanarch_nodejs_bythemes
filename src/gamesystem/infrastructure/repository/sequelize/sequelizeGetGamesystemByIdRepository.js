// sequelizeGetGamesystemByIdRepository.js

const container = require('../../../../shared/infrastructure/container/container');
const { Gamesystem } = require('./sequelizeGamesystemModel');

const MODULE_NAME = '[sequelizeGetGamesystemById Repository]';

exports.execute = async (id) => {
  container.getLogger().debug(`${MODULE_NAME} (IN) --> id: ${id}`);

  if (id == null) {
    return undefined;
  }

  const result = await Gamesystem.findOne({
    where: { id },
  });

  container.getLogger().debug(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};
