// LoadConfigController.js

const BaseController = require('../../../shared/adapter/controller/BaseController');

class LoadConfigController extends BaseController {
  async execute() {
    try {
      super.logIn(this.constructor.name);

      const uc = super.buildUC();
      const result = await uc.execute();

      return super.prepareResponse(this.constructor.name, result);
    } catch (err) {
      super.logError(this.constructor.name, err);
      throw err;
    }
  }
}

module.exports = LoadConfigController;
