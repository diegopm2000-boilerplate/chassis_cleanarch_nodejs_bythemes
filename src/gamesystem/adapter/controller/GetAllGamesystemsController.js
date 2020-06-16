// GetAllGamesystemsController.js

const GenericController = require('../../../shared/adapter/controller/GenericController');

class GetAllGamesystemsController extends GenericController {
  async execute(req, res, next) {
    try {
      const moduleName = GetAllGamesystemsController.name;

      this.logger.info(`${moduleName} (IN) --> req: <<req>, res: <<res>>, next: <<next>>`);

      const result = await this.uc.execute(this.repository, this.presenter, this.logger);

      this.logger.info(`${moduleName} (OUT) --> result: ${JSON.stringify(result)}`);
      res.status(result.code).json(result.data);
    } catch (err) {
      this.logger.error(err.stack);
      next(new Error('Internal Error'));
    }
  }
}

module.exports = GetAllGamesystemsController;
