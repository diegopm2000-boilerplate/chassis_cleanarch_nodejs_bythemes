// CommonGamesystemController.js

const HttpController = require('../../../shared/adapter/controller/HttpController');

class CommonGamesystemController extends HttpController {
  async execute(req, res, next) {
    try {
      super.logInDefault();

      const parseFields = {
        params: ['gamesystemId'],
      };
      const params = this.requestParser.parse(req, parseFields);

      const uc = super.buildUC();
      const result = await uc.execute(params);

      super.sendResponse(result, res);
    } catch (err) {
      super.handleError(next, err);
    }
  }
}

module.exports = CommonGamesystemController;
