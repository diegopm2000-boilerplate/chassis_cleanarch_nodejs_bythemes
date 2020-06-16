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
      this.logger.error(err.stack);
      throw err;
    }
  }
}

module.exports = LoadConfigController;
