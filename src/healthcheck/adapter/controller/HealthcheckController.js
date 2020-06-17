// HealthcheckController.js

const HttpController = require('../../../shared/adapter/controller/HttpController');

class HealthcheckController extends HttpController {
  async execute(req, res, next) {
    try {
      super.logIn(this.constructor.name);

      const uc = super.buildUC();
      const result = await uc.execute();

      super.sendResponse(this.constructor.name, result, res);
    } catch (err) {
      super.handleError(next, err);
    }
  }
}

module.exports = HealthcheckController;
