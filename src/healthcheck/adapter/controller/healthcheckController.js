// healthcheckController.js

const healthcheckUC = require('../../usecase/healthcheckUC');
const presenter = require('../../../shared/adapter/presenter/httpObjectPresenter');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[healthcheck Controller]';

let logger;

// //////////////////////////////////////////////////////////////////////////////
// Public methods
// //////////////////////////////////////////////////////////////////////////////

exports.init = (loggerIN) => {
  logger = loggerIN;
};

exports.execute = async (req, res, next) => {
  try {
    logger.info(`${MODULE_NAME} (IN) --> req: <<req>, res: <<res>>, next: <<next>>`);

    const result = await healthcheckUC.execute(presenter, logger);

    logger.info(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
    res.status(result.code).json(result.data);
  } catch (err) {
    logger.error(err.stack);
    next(new Error('Internal Error'));
  }
};
