// etConfigController.js

// const getConfigUC = require('../../usecase/getConfigUC');
// const presenter = require('../../../shared/adapter/presenter/httpObjectPresenter');

// // //////////////////////////////////////////////////////////////////////////////
// // Properties & Constants
// // //////////////////////////////////////////////////////////////////////////////

// const MODULE_NAME = '[getConfig Controller]';

// let logger;
// let configRepository;

// // //////////////////////////////////////////////////////////////////////////////
// // Public methods
// // //////////////////////////////////////////////////////////////////////////////

// exports.init = (configRepositoryIN, loggerIN) => {
//   logger = loggerIN;
//   configRepository = configRepositoryIN;
// };

// exports.execute = async (req, res, next) => {
//   try {
//     logger.info(`${MODULE_NAME} (IN) --> req: <<req>, res: <<res>>, next: <<next>>`);

//     const result = await getConfigUC.execute(configRepository, presenter, logger);

//     logger.info(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
//     res.status(result.code).json(result.data);
//   } catch (err) {
//     logger.error(err.stack);
//     next(new Error('Internal Error'));
//   }
// };

const GenericController = require('../../../shared/adapter/controller/GenericController');

class GetConfigController extends GenericController {
  async execute(req, res, next) {
    try {
      const moduleName = GetConfigController.name;

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

module.exports = GetConfigController;
