// CreateGamesystemController.js

const HttpController = require('../../../shared/adapter/controller/HttpController');

class CreateGamesystemController extends HttpController {
  async execute(req, res, next) {
    try {
      super.logIn(this.constructor.name);

      const parseFields = {
        body: ['name', 'description'],
      };
      const params = this.requestParser.parse(req, parseFields);

      const uc = super.buildUC();
      const result = await uc.execute(params);

      super.sendResponse(this.constructor.name, result, res);
    } catch (err) {
      super.handleError(next, err);
    }
  }
}

module.exports = CreateGamesystemController;
