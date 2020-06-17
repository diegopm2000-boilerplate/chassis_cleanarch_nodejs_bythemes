// GetAllGamesystemsUC.js

const BaseUC = require('../../shared/usecase/BaseUC');

class GetAllGamesystemsUC extends BaseUC {
  async execute() {
    super.logIn('params: no params');

    // Get objects from repository
    const innerResult = await this.repository.getAll();
    super.logMid(`innerResult: ${JSON.stringify(innerResult)}`);

    // Build & Return result
    return super.presentObject(innerResult);
  }
}

module.exports = GetAllGamesystemsUC;
