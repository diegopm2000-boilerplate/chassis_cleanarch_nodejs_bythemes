// HealthcheckController.js

const GenericController = require('../../../shared/adapter/controller/GenericController');

class HealthcheckController extends GenericController {
  async execute(req, res, next) {
    try {
      super.logIn(this.constructor.name);

      const uc = super.buildUC();
      const result = await uc.execute();

      super.returnResponse(this.constructor.name, result, res);
    } catch (err) {
      this.logger.error(err.stack);
      next(new Error('Internal Error'));
    }
  }
}

module.exports = HealthcheckController;
