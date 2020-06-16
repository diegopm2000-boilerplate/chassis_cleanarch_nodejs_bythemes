// GetConfigUC.js

const BaseUC = require('../../shared/usecase/BaseUC');

class GetConfigUC extends BaseUC {
  async execute(params) {
    super.logIn(this.constructor.name, params);

    // Get Config from repository
    const innerResult = await this.repository.get();
    this.logger.debug(`${this.constructor.name} (MID) --> innerResult: ${JSON.stringify(innerResult)}`);

    // Build & Return result
    return this.presenter.presentObject(this.constructor.name, this.logger, innerResult);
  }
}

module.exports = GetConfigUC;