// GetAllGamesystemsUC.js

const BaseUC = require('../../shared/usecase/BaseUC');

class GetAllGamesystemsUC extends BaseUC {
  async execute() {
    super.logIn(this.constructor.name);

    const innerResult = await this.repository.getAll();
    this.logger.debug(`${this.constructor.name} (MID) --> innerResult: ${JSON.stringify(innerResult)}`);

    // Build & Return result
    return this.presenter.presentObject(this.constructor.name, this.logger, innerResult);
  }
}

module.exports = GetAllGamesystemsUC;
