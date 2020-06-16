// createGamesystemUC.js

const BaseUC = require('../../shared/usecase/BaseUC');
const { Gamesystem } = require('../domain/Gamesystem');

class CreateGamesystemUC extends BaseUC {
  async execute(params) {
    super.logIn(this.constructor.name, params);

    // IN parameters
    const { dataIN } = params;

    // Build data
    const data = JSON.parse(JSON.stringify(dataIN));
    data.id = this.uniqIdGenerator.generateUniqId();

    // Create Domain Object
    const gamesystemDO = new Gamesystem(data, this.schemaValidator);
    if (gamesystemDO.errors && gamesystemDO.errors.length > 0) {
      return this.presenter.presentConflict(this.constructor.name, this.logger, gamesystemDO.errors);
    }

    // Check if exists a previous Gamesystem with the same name
    const filter = { name: dataIN.name };
    const gamesystemFound = await this.repository.getByFilter(filter);
    if (gamesystemFound != null) {
      return this.presenter.presentConflict(this.constructor.name, this.logger, 'There is a previous gamesystem with the same name in the system');
    }

    // Persistence
    const innerResult = await this.repository.create(gamesystemDO);
    this.logger.debug(`${this.constructor.name} (MID) --> innerResult: ${JSON.stringify(innerResult)}`);

    // Build & Return Result
    return this.presenter.presentCreatedObject(this.constructor.name, this.logger, innerResult);
  }
}

module.exports = CreateGamesystemUC;
