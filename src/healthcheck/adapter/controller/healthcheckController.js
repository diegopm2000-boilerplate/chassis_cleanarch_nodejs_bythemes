// healthcheckController.js

const logger = require('../../../shared/infrastructure/log/logFacade');
const presenter = require('../../../shared/adapter/presenter/httpPresenter');
const healthcheckUC = require('../../usecase/healthcheckUC');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[healthcheckController]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (req, res, next) => {
  try {
    logger.info(`${MODULE_NAME} (IN) -> no params`);

    const result = await healthcheckUC.execute({
      logger, presenter,
    });

    logger.info(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
};
