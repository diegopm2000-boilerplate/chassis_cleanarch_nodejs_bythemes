// GetGamesystemByIdUC.js

const BaseUC = require('../../shared/usecase/BaseUC');

class GetGamesystemByIdUC extends BaseUC {
  async execute(params) {
    super.logIn(this.constructor.name, params);
    // Business IN parameters
    const { gamesystemId: id } = params;

    const objFound = await this.repository.getById(id);
    this.logger.debug(`${this.constructor.name} (MID) --> objFound: ${JSON.stringify(objFound)}`);

    // Build and Return result
    return this.presenter.presentObjectIfFound(this.constructor.name, this.logger, objFound);
  }
}

module.exports = GetGamesystemByIdUC;
