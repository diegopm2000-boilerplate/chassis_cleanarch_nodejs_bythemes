// GetConfigUC.js

const BaseUC = require('../../shared/usecase/BaseUC');

class GetConfigUC extends BaseUC {
  async execute() {
    super.logIn('no params');

    // Get Config from repository
    const innerResult = await this.repository.get();
    super.logMid(`innerResult: ${JSON.stringify(innerResult)}`);

    // Build & Return result
    return super.presentObject(innerResult);
  }
}

module.exports = GetConfigUC;
