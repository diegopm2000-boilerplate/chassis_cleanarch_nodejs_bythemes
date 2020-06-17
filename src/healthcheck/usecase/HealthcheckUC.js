// HealthcheckUC.js

const BaseUC = require('../../shared/usecase/BaseUC');

class HealthcheckUC extends BaseUC {
  async execute() {
    super.logIn('no params');

    // Prepare message result
    const innerResult = { message: 'OK' };
    super.logMid(`innerResult: ${JSON.stringify(innerResult)}`);

    // Build & Return result
    return super.presentObject(innerResult);
  }
}

module.exports = HealthcheckUC;
