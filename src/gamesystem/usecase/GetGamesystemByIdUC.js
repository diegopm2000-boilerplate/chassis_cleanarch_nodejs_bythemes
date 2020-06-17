// GetGamesystemByIdUC.js

const BaseUC = require('../../shared/usecase/BaseUC');

class GetGamesystemByIdUC extends BaseUC {
  async execute(params) {
    super.logIn(`params: ${JSON.stringify(params)}`);

    // Business IN parameters
    const { gamesystemId: id } = params;

    // Get object from repository
    const objFound = await this.repository.getById(id);
    super.logMid(`objFound: ${JSON.stringify(objFound)}`);

    // Build and Return result
    return super.presentObjectIfFound(objFound);
  }
}

module.exports = GetGamesystemByIdUC;
