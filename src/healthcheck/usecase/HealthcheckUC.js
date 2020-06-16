// HealthcheckUC.js

const BaseUC = require('../../shared/usecase/BaseUC');

class HealthcheckUC extends BaseUC {
  async execute(params) {
    super.logIn(this.constructor.name, params);

    // Prepare message result
    const innerResult = { message: 'OK' };
    this.logger.debug(`${this.constructor.name} (MID) --> innerResult: ${JSON.stringify(innerResult)}`);

    // Build & Return result
    return this.presenter.presentObject(this.constructor.name, this.logger, innerResult);
  }
}

module.exports = HealthcheckUC;
