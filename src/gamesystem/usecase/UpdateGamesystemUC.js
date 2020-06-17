// updateGamesystemUC.js

const BaseUC = require('../../shared/usecase/BaseUC');
const { Gamesystem } = require('../domain/Gamesystem');

class UpdateGamesystemUC extends BaseUC {
  async execute(params) {
    super.logIn(`params: ${JSON.stringify(params)}`);

    // Business IN parameters
    const { gamesystemId: id, dataIN } = params;

    // Build data
    const data = JSON.parse(JSON.stringify(dataIN));
    data.id = id;

    // Create Domain Object
    const gamesystemDO = new Gamesystem(data, this.schemaValidator);
    if (gamesystemDO.errors && gamesystemDO.errors.length > 0) {
      return super.presentConflict(gamesystemDO.errors);
    }

    // Check if exists a gamesystem with the same id
    let gamesystemFound = await this.repository.getById(id);
    if (gamesystemFound == null) {
      return super.presentObjectNotFound();
    }

    // Check if exists a previous Gamesystem with the same name and distinct id
    const filter = { name: data.name };
    gamesystemFound = await this.repository.getByFilter(filter);
    if (gamesystemFound != null && gamesystemFound.id !== id) {
      return super.presentConflict('There is a previous gamesystem with the same name in the system');
    }

    // Persistence
    const innerResult = await this.repository.update(id, gamesystemDO);
    super.logMid(`innerResult: ${JSON.stringify(innerResult)}`);

    // Load the updated object
    const updatedObj = await this.repository.getById(id);

    // Build & Returning Result
    return super.presentObject(updatedObj);
  }
}

module.exports = UpdateGamesystemUC;
