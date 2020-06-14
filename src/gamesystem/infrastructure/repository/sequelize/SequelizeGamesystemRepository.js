// SequelizeGamesystemRepository.js

/* eslint-disable class-methods-use-this */

const GamesystemRepository = require('../../../adapter/repository/GamesystemRepository');
const { Gamesystem } = require('./sequelizeGamesystemModel');
const logger = require('../../../../shared/infrastructure/log/logColorLogger');

const MODULE_NAME = '[SequelizeGamesystemRepository]';

class SequelizeGamesystemRepository extends GamesystemRepository {
  async getAll() {
    logger.debug(`${MODULE_NAME} (IN) --> no params`);

    const result = await Gamesystem.findAll();

    logger.debug(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
    return result;
  }

  async getById(id) {
    logger.debug(`${MODULE_NAME} (IN) --> id: ${id}`);

    if (id == null) {
      return undefined;
    }

    const result = await Gamesystem.findOne({
      where: { id },
    });

    logger.debug(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
    return result;
  }

  async getByFilter(filter) {
    logger.debug(`${MODULE_NAME} (IN) --> filter: ${JSON.stringify(filter)}`);

    const result = await Gamesystem.findOne({
      where: filter,
    });

    logger.debug(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
    return result;
  }

  async create(newObj) {
    logger.debug(`${MODULE_NAME} (IN) --> newObj: ${JSON.stringify(newObj)}`);

    const result = await Gamesystem.create(newObj);

    logger.debug(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
    return result;
  }

  async update(id, data) {
    logger.debug(`${MODULE_NAME} (IN) --> id: ${id}, data: ${JSON.stringify(data)}`);

    const result = await Gamesystem.update(
      data, {
        where: { id },
      },
    );
    logger.debug(`${MODULE_NAME} (MID) --> number of rows updated: ${result}`);
    return result;
  }

  async remove(id) {
    logger.debug(`${MODULE_NAME} (IN) --> id: ${id}`);

    const innerResult = await Gamesystem.destroy({
      where: { id },
    });
    logger.debug(`${MODULE_NAME} (MID) --> number of rows deleted: ${innerResult}`);

    const result = (innerResult === 1);

    logger.debug(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
    return result;
  }
}

module.exports = SequelizeGamesystemRepository;
