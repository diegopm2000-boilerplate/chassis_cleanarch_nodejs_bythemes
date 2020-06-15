// getConfigController.js

const getConfigUC = require('../../usecase/getConfigUC');
const presenter = require('../../../shared/adapter/presenter/httpObjectPresenter');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[getConfig Controller]';

let logger;
let configRepository;

// //////////////////////////////////////////////////////////////////////////////
// Public methods
// //////////////////////////////////////////////////////////////////////////////

exports.init = (configRepositoryIN, loggerIN) => {
  logger = loggerIN;
  configRepository = configRepositoryIN;
};

exports.execute = async (req, res, next) => {
  try {
    logger.info(`${MODULE_NAME} (IN) --> req: <<req>, res: <<res>>, next: <<next>>`);

    const result = await getConfigUC.execute(configRepository, presenter, logger);

    logger.info(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
    res.status(result.code).json(result.data);
  } catch (err) {
    logger.error(err.stack);
    next(new Error('Internal Error'));
  }
};
