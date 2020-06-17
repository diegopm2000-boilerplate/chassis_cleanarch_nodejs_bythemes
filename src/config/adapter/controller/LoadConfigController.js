// LoadConfigController.js

const BaseController = require('../../../shared/adapter/controller/BaseController');

class LoadConfigController extends BaseController {
  async execute() {
    try {
      super.logInDefault();

      const uc = super.buildUC();
      const result = await uc.execute();

      return super.prepareResponse(result);
    } catch (err) {
      console.log('Nos fuimos por el error del LoadConfigController');
      super.logError(err);
      throw err;
    }
  }
}

module.exports = LoadConfigController;
