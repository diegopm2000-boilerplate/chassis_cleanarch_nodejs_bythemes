// createGamesystemUC.js

const BaseUC = require('../../shared/usecase/BaseUC');
const { Gamesystem } = require('../domain/Gamesystem');

class CreateGamesystemUC extends BaseUC {
  async execute(params) {
    super.logIn(`params: ${JSON.stringify(params)}`);

    // IN parameters
    const { dataIN } = params;

    // Build data
    const data = JSON.parse(JSON.stringify(dataIN));
    data.id = this.uniqIdGenerator.generateUniqId();

    // Create Domain Object
    const gamesystemDO = new Gamesystem(data, this.schemaValidator);
    if (gamesystemDO.errors && gamesystemDO.errors.length > 0) {
      return super.presentConflict(gamesystemDO.errors);
    }

    // Check if exists a previous Gamesystem with the same name
    const filter = { name: dataIN.name };
    const gamesystemFound = await this.repository.getByFilter(filter);
    if (gamesystemFound != null) {
      return super.presentConflict('There is a previous gamesystem with the same name in the system');
    }

    // Persistence
    const innerResult = await this.repository.create(gamesystemDO);
    super.logMid(`innerResult: ${JSON.stringify(innerResult)}`);

    // Build & Return Result
    return super.presentCreatedObject(innerResult);
  }
}

module.exports = CreateGamesystemUC;
