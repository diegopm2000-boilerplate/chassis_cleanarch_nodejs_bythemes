// SequelizeCRUDRepository.js

const logger = require('../log/logFacade');

class SequelizeCRUDRepository {
  async getAll(model) {
    logger.debug(`${this.constructor.name} (IN) --> no params`);

    const result = await model.findAll();

    logger.debug(`${this.constructor.name} (OUT) --> result: ${JSON.stringify(result)}`);
    return result;
  }

  async getById(model, id) {
    logger.debug(`${this.constructor.name} (IN) --> id: ${id}`);

    if (id == null) {
      return undefined;
    }

    const result = await model.findOne({
      where: { id },
    });

    logger.debug(`${this.constructor.name} (OUT) --> result: ${JSON.stringify(result)}`);
    return result;
  }

  async getByFilter(model, filter) {
    logger.debug(`${this.constructor.name} (IN) --> filter: ${JSON.stringify(filter)}`);

    const result = await model.findOne({
      where: filter,
    });

    logger.debug(`${this.constructor.name} (OUT) --> result: ${JSON.stringify(result)}`);
    return result;
  }

  async create(model, newObj) {
    logger.debug(`${this.constructor.name} (IN) --> newObj: ${JSON.stringify(newObj)}`);

    const result = await model.create(newObj);

    logger.debug(`${this.constructor.name} (OUT) --> result: ${JSON.stringify(result)}`);
    return result;
  }

  async update(model, id, data) {
    logger.debug(`${this.constructor.name} (IN) --> id: ${id}, data: ${JSON.stringify(data)}`);

    const result = await model.update(
      data, {
        where: { id },
      },
    );
    logger.debug(`${this.constructor.name} (MID) --> number of rows updated: ${result}`);
    return result;
  }

  // eslint-disable-next-line class-methods-use-this
  async remove(model, id) {
    logger.debug(`${this.constructor.name} (IN) --> id: ${id}`);

    const innerResult = await model.destroy({
      where: { id },
    });
    logger.debug(`${this.constructor.name} (MID) --> number of rows deleted: ${innerResult}`);

    const result = (innerResult === 1);

    logger.debug(`${this.constructor.name} (OUT) --> result: ${JSON.stringify(result)}`);
    return result;
  }
}

module.exports = SequelizeCRUDRepository;
