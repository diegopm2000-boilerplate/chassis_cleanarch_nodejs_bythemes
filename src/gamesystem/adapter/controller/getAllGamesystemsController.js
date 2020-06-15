// getAllGamesystemsController.js

const getAllGamesystemsUC = require('../../usecase/getAllGamesystemsUC');
const presenter = require('../../../shared/adapter/presenter/httpObjectPresenter');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[getAllGamesystems Controller]';

let logger;
let gamesystemRepository;

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.init = (gamesystemRepositoryIN, loggerIN) => {
  // requestParser = dependencies.requestParser;
  logger = loggerIN;
  gamesystemRepository = gamesystemRepositoryIN;
};

exports.execute = async (req, res, next) => {
  try {
    logger.info(`${MODULE_NAME} (IN) --> req: <<req>, res: <<res>>, next: <<next>>`);

    const result = await getAllGamesystemsUC.execute(gamesystemRepository, presenter, logger);

    logger.info(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
    res.status(result.code).json(result.data);
  } catch (err) {
    logger.error(err.stack);
    next(new Error('Internal Error'));
  }
};
