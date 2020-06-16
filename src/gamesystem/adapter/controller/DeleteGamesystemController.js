// DeleteGamesystemController.js

const GenericController = require('../../../shared/adapter/controller/GenericController');

class DeleteGamesystemController extends GenericController {
  async execute(req, res, next) {
    try {
      const moduleName = DeleteGamesystemController.name;
      this.logger.info(`${moduleName} (IN) --> req: <<req>, res: <<res>>, next: <<next>>`);

      const parseFields = {
        params: ['gamesystemId'],
      };
      const params = this.requestParser.parse(req, parseFields);

      const result = await this.uc.execute(this.repository, this.presenter, this.logger, params);

      this.logger.info(`${moduleName} (OUT) --> result: ${JSON.stringify(result)}`);
      res.status(result.code).json(result.data);
    } catch (err) {
      this.logger.error(err.stack);
      next(new Error('Internal Error'));
    }
  }
}

module.exports = DeleteGamesystemController;
