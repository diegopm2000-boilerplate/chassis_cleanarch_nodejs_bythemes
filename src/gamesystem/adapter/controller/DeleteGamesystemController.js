// DeleteGamesystemController.js

const GenericController = require('../../../shared/adapter/controller/GenericController');

class DeleteGamesystemController extends GenericController {
  async execute(req, res, next) {
    try {
      super.logIn(this.constructor.name);

      const parseFields = {
        params: ['gamesystemId'],
      };
      const params = this.requestParser.parse(req, parseFields);

      const uc = super.buildUC();
      const result = await uc.execute(params);

      super.returnResponse(this.constructor.name, result, res);
    } catch (err) {
      this.logger.error(err.stack);
      next(new Error('Internal Error'));
    }
  }
}

module.exports = DeleteGamesystemController;
