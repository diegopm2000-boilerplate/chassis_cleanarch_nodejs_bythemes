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
      this.logger.error(err.stack);
      next(new Error('Internal Error'));
    }
  }
}

module.exports = HealthcheckController;
